"""Read-only interoperability contract with the optional Wecker scheduler."""
import importlib.util
from copy import deepcopy
from datetime import datetime, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace as NS
from unittest import IsolatedAsyncioTestCase
from unittest.mock import AsyncMock, Mock, patch
from zoneinfo import ZoneInfo

spec = importlib.util.spec_from_file_location('alarm_reader', Path(__file__).resolve().parents[1] / 'custom_components/light_manager/alarm_schedule.py')
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
UTC = timezone.utc


class AlarmScheduleTests(IsolatedAsyncioTestCase):
    def setUp(self):
        self.now = datetime(2026, 11, 13, 5, tzinfo=UTC)
        self.caller = NS(is_admin=True, is_active=True, system_generated=False)
        self.owner = NS(id='owner')
        self.record = {'revision': 1, 'name': 'Maximilian', 'binding': {'card_id': 'card', 'lights': [
            {'entity_id': 'light.bett', 'brightness': 65, 'color_mode': 'temperature', 'kelvin': 2700},
            {'entity_id': 'light.relais', 'brightness': 100, 'color_mode': 'last'},
            {'entity_id': 'light.blocked', 'brightness': 100, 'color_mode': 'last'}]}, 'runs': {}}
        self.entry = NS(options={'wake_cards': {'alarm': self.record}})
        self.hass = NS(data={'wecker_manager': {'entry': self.entry}}, services=NS(async_call=AsyncMock()))
        self.forecast = {'types': {'schultag': {'active': True, 'at': '2026-11-13T06:00:00+00:00'},
                                   'disabled': {'active': False, 'at': None}}}
        def allowed(hass, owner, caller, entity, domain):
            self.assertIs(owner, self.owner); self.assertIs(caller, self.caller); self.assertEqual(domain, 'light')
            if entity == 'light.blocked': raise PermissionError()
            return NS(attributes={'friendly_name': entity, 'supported_color_modes': ['color_temp'] if entity == 'light.bett' else ['onoff']})
        def phases(hass, record, local, errors):
            wake = datetime.fromisoformat(self.forecast['types']['schultag']['at']).astimezone(ZoneInfo('Europe/Berlin'))
            result = []
            if local == wake: result.append(('schultag', 'wake', wake.date().isoformat()))
            if local == wake - timedelta(minutes=15) and local.date() == wake.date():
                result.append(('schultag', 'sunrise', wake.date().isoformat()))
            return result
        self.wake = NS(KEY='wake_cards', checked_record=AsyncMock(return_value=(self.entry, self.record, self.owner)),
                       upcoming_info=AsyncMock(return_value=self.forecast),
                       day_definitions=Mock(return_value=[{'id': 'schultag', 'name': 'Schultag'}]),
                       sunrise_minutes=Mock(return_value=15), allowed_entity=Mock(side_effect=allowed),
                       due_phases=Mock(side_effect=phases), execute=AsyncMock(), save_record=Mock())
        self.loader = patch.object(m, 'import_module', return_value=self.wake); self.loader.start(); self.addCleanup(self.loader.stop)

    async def read(self):
        return await m.async_alarm_schedule(self.hass, self.caller, now=self.now, zone='Europe/Berlin')

    async def test_optional_integration_absent_never_imported(self):
        self.hass.data = {}
        result = await self.read()
        self.assertEqual(result, {'items': [], 'incomplete': False})
        m.import_module.assert_not_called()

    async def test_non_admin_inactive_or_system_user_gets_no_alarm_data(self):
        for caller in [None, NS(is_admin=False, is_active=True), NS(is_admin=True, is_active=False), NS(is_admin=True, is_active=True, system_generated=True)]:
            self.caller = caller
            self.assertEqual((await self.read())['items'], [])
        m.import_module.assert_not_called()

    async def test_future_lights_include_sunrise_and_wake_but_no_other_devices(self):
        before = deepcopy(self.record)
        result = await self.read()
        self.assertFalse(result['incomplete'])
        self.assertEqual([(row['phase'], row['entity']) for row in result['items']], [
            ('sunrise', 'light.bett'), ('wake', 'light.bett'), ('wake', 'light.relais')])
        first = result['items'][0]
        self.assertEqual(first['due'], '2026-11-13T05:45:00+00:00')
        self.assertEqual(first['action'], {'mode': 'on', 'brightness': 65, 'kelvin': 2700, 'rgb': None})
        self.assertEqual(first['minutes'], 15)
        self.assertEqual(self.record, before)
        self.wake.execute.assert_not_called(); self.wake.save_record.assert_not_called(); self.hass.services.async_call.assert_not_called()

    async def test_completed_and_past_sunrise_disappears_without_changing_wake(self):
        self.record['runs']['2026-11-13/schultag/sunrise'] = True
        self.assertEqual({r['phase'] for r in (await self.read())['items']}, {'wake'})
        self.record['runs'].clear(); self.now = datetime(2026, 11, 13, 5, 50, tzinfo=UTC)
        self.assertEqual({r['phase'] for r in (await self.read())['items']}, {'wake'})

    async def test_disabled_calendar_paused_and_finished_alarms_are_not_invented(self):
        self.forecast['types']['schultag']['active'] = False
        self.assertEqual((await self.read())['items'], [])
        self.forecast['types']['schultag']['active'] = True
        self.wake.due_phases.side_effect = lambda *args: []
        self.assertEqual((await self.read())['items'], [])

    async def test_no_sunrise_across_midnight_matches_actual_scheduler(self):
        self.now = datetime(2026, 11, 13, 22, tzinfo=UTC)
        self.forecast['types']['schultag']['at'] = '2026-11-13T23:05:00+00:00'
        self.assertEqual([row['phase'] for row in (await self.read())['items']], ['wake', 'wake'])

    async def test_local_date_instead_of_utc_date_and_no_tomorrow_entries(self):
        self.now = datetime(2026, 11, 13, 23, 1, tzinfo=UTC)
        self.forecast['types']['schultag']['at'] = '2026-11-13T23:30:00+00:00'
        self.assertEqual(len((await self.read())['items']), 3)
        self.forecast['types']['schultag']['at'] = '2026-11-14T23:30:00+00:00'
        self.assertEqual((await self.read())['items'], [])

    async def test_sunrise_inside_window_is_shown_even_if_wake_is_outside(self):
        self.now = datetime(2026, 11, 13, 5, 50, tzinfo=UTC)
        self.record['settings'] = {'types': {'schultag': {'enabled': True, 'time': '07:00'}}}
        self.forecast['types']['schultag'] = {'active': False, 'at': '2026-11-14T06:00:00+00:00'}
        result = await self.read()
        self.assertEqual([(row['phase'],row['due']) for row in result['items']], [('sunrise','2026-11-14T05:45:00+00:00')])

    async def test_alarm_exact_window_end_is_excluded(self):
        self.forecast['types']['schultag']['at'] = '2026-11-14T05:00:00+00:00'
        result = await self.read()
        self.assertEqual([row['phase'] for row in result['items']], ['sunrise'])

    async def test_changed_revision_is_not_combined_with_old_forecast(self):
        async def changed(*args):
            self.entry.options['wake_cards']['alarm'] = {**self.record, 'revision': 2}
            return self.forecast
        self.wake.upcoming_info.side_effect = changed
        result = await self.read()
        self.assertTrue(result['incomplete']); self.assertEqual(result['items'], [])

    async def test_denied_owner_or_missing_integration_api_fails_closed(self):
        self.wake.checked_record.side_effect = PermissionError()
        self.assertEqual((await self.read()), {'items': [], 'incomplete': True})
        del self.wake.upcoming_info
        self.assertEqual((await self.read()), {'items': [], 'incomplete': True})

    async def test_malformed_timestamp_and_source_errors_do_not_escape_into_light_manager(self):
        self.forecast['types']['schultag']['at'] = '2026-11-13T07:00:00'
        self.assertEqual((await self.read()), {'items': [], 'incomplete': True})
        self.wake.upcoming_info.side_effect = TimeoutError()
        self.assertEqual((await self.read()), {'items': [], 'incomplete': True})

    async def test_bad_alarm_does_not_hide_other_alarm(self):
        self.entry.options['wake_cards']['bad'] = {'binding': {'card_id': 'bad'}, 'revision': 1}
        async def checked(hass, caller, alarm, card):
            if alarm == 'bad': raise PermissionError()
            return self.entry, self.record, self.owner
        self.wake.checked_record.side_effect = checked
        result = await self.read()
        self.assertTrue(result['incomplete']); self.assertEqual(len(result['items']), 3)

    async def test_scene_metadata_can_be_displayed_without_calling_scene_service(self):
        self.record['binding']['lights'][0].update(color_mode='scene', scene='scene.bett_ruhe')
        result = await self.read()
        self.assertEqual(result['items'][0]['action'], {'mode': 'scene', 'scene': 'scene.bett_ruhe'})
        self.hass.services.async_call.assert_not_called()
