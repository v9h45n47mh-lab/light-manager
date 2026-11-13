"""The display horizon must not change the actual execution engine."""
from copy import deepcopy
from datetime import datetime, time, timezone
from unittest import TestCase
from test_engine import Engine, fixture, program, action, at


class ScheduleWindowTests(TestCase):
    def test_crosses_midnight_in_actual_timestamp_order(self):
        engine=Engine(fixture(program('p','time',[action('late',time='23:30'),action('early',time='00:15')])))
        rows=engine.upcoming(at('2026-11-13T21:00:00'))
        self.assertEqual([(r['action'],r['date']) for r in rows],[('late','2026-11-13'),('early','2026-11-14')])

    def test_half_open_elapsed_window_and_two_occurrences_on_short_day(self):
        engine=Engine(fixture(program('p','time',[action(time='13:30')])))
        rows=engine.upcoming(at('2026-03-28T12:00:00'))
        self.assertEqual([r['date'] for r in rows],['2026-03-28','2026-03-29'])
        engine=Engine(fixture(program('p','time',[action(time='13:00')])))
        self.assertEqual(len(engine.upcoming(at('2026-11-13T12:00:00'))),1)

    def test_weekdays_season_enabled_and_vacation_respected_for_each_date(self):
        c=fixture(program('weekend','time',[action('yes',time='07:00')],days=[5,6]),
                  program('weekday','time',[action('no',time='07:00')],days=[0,1,2,3,4]),
                  program('inactive','time',[action('disabled',time='07:00')],enabled=False),
                  program('season','time',[action('season_action',time='07:00')],season_enabled=True,season_from='11-13',season_to='11-13'),
                  program('vacation','time',[action('vacation_action',time='07:00')],pause_in_vacation=True))
        c['vacation']=True
        self.assertEqual([r['action'] for r in Engine(c).upcoming(at('2026-11-13T21:00:00'))],['yes'])

    def test_tomorrow_skips_do_not_hide_today_or_another_occurrence(self):
        c=fixture(program('p','time',[action(time='13:30',skips=['2026-03-29'])]))
        rows=Engine(c).upcoming(at('2026-03-28T12:00:00'))
        self.assertEqual([(r['date'],r['skipped']) for r in rows],[('2026-03-28',False),('2026-03-29',True)])

    def test_once_dates_and_completed_actions_are_filtered(self):
        e=Engine(fixture(program('once_program','time',[action('once',time='23:30')],once_date='2026-11-13')))
        self.assertEqual(len(e.upcoming(at('2026-11-13T21:00:00'))),1)
        e.rt['once_done']['once']={'date':'2026-11-13','complete':True}
        self.assertEqual(e.upcoming(at('2026-11-13T21:00:00')),[])
        self.assertEqual(e.upcoming(at('2026-11-14T21:00:00')),[])

    def test_nonexistent_and_ambiguous_times_match_execution_due(self):
        e=Engine(fixture(program('p','time',[action(time='02:30')])))
        spring=e.upcoming(at('2026-03-28T12:00:00'))
        self.assertEqual(datetime.fromisoformat(spring[0]['due']).astimezone(timezone.utc),at('2026-03-29T01:30:00'))
        autumn=e.upcoming(at('2026-10-24T12:00:00'))
        self.assertEqual(len(autumn),1)
        self.assertEqual(datetime.fromisoformat(autumn[0]['due']).astimezone(timezone.utc),at('2026-10-25T00:30:00'))

    def test_fall_back_window_is_24_elapsed_hours_not_tomorrow_same_clock(self):
        e=Engine(fixture(program('p','time',[action('within',time='12:30'),action('outside',time='13:30')])))
        self.assertEqual([r['action'] for r in e.upcoming(at('2026-10-24T12:00:00'))],['within'])

    def test_future_solar_event_offset_and_bounds_use_that_occurrence_date(self):
        e=Engine(fixture(program('p','time',[action(event='sunrise',offset=10,earliest='08:00',latest='10:00')])))
        calls=[]
        def solar(event,day):
            calls.append(day)
            return datetime.combine(day,time(6),timezone.utc)
        rows=e.upcoming(at('2026-11-13T21:00:00'),solar)
        self.assertEqual(len(rows),1);self.assertEqual(rows[0]['date'],'2026-11-14')
        self.assertEqual(datetime.fromisoformat(rows[0]['due']).hour,8)
        self.assertEqual(e.upcoming(at('2026-11-13T21:00:00'),lambda *a:None),[])

    def test_preview_is_read_only_even_with_old_runtime_and_planned_data(self):
        e=Engine(fixture(program('p','time',[action(time='23:00')])))
        e.rt['once_done']['old']={'date':'2026-01-01','complete':True}
        e.planned=[{'original':True}]
        before=deepcopy((e.rt,e.planned,e.config,e.rules,e.warnings,e.status))
        e.upcoming(at('2026-11-13T21:00:00'));e.upcoming(at('2026-11-13T21:00:00'))
        self.assertEqual((e.rt,e.planned,e.config,e.rules,e.warnings,e.status),before)
