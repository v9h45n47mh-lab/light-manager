"""Optional read-only view of the Wecker Manager's authoritative light schedule."""
from __future__ import annotations

import asyncio
from datetime import datetime, timedelta, timezone
from importlib import import_module
from zoneinfo import ZoneInfo


def _timestamp(value):
    result = datetime.fromisoformat(value)
    if result.tzinfo is None:
        raise ValueError('Alarm schedule must contain timezone-aware times')
    return result.astimezone(timezone.utc)


async def async_alarm_schedule(hass, caller, *, now, zone):
    """Return today's future light actions, never claim/execute/save an alarm.

    Only administrators can request the Light Manager snapshot. Still run the
    Wecker's own owner, account, calendar and entity permission checks here.
    The optional integration is neither installed nor configured by this view.
    """
    empty = {'items': [], 'incomplete': False}
    if not (caller and getattr(caller, 'is_admin', False)
            and getattr(caller, 'is_active', False)
            and not getattr(caller, 'system_generated', False)):
        return empty
    entries = hass.data.get('wecker_manager', {})
    if not entries:
        return empty
    try:
        wake = import_module('custom_components.wecker_manager.wake_cards')
        required = ('KEY', 'checked_record', 'upcoming_info', 'day_definitions',
                    'due_phases', 'sunrise_minutes', 'allowed_entity')
        if any(not hasattr(wake, name) for name in required):
            return {**empty, 'incomplete': True}
        records = [(alarm_id, record.get('binding', {}).get('card_id'))
                   for entry in entries.values()
                   for alarm_id, record in entry.options.get(wake.KEY, {}).items()
                   if isinstance(record, dict)]
    except Exception:
        return {**empty, 'incomplete': True}
    local_zone = ZoneInfo(zone)
    now = now.astimezone(timezone.utc)
    today = now.astimezone(local_zone).date()

    async def read(alarm_id, card_id):
        async with asyncio.timeout(12):
            entry, record, owner = await wake.checked_record(hass, caller, alarm_id, card_id)
            revision = record.get('revision')
            upcoming = await wake.upcoming_info(hass, caller, alarm_id, card_id)
            current = entry.options.get(wake.KEY, {}).get(alarm_id, {})
            if current.get('revision') != revision or current.get('binding', {}).get('card_id') != card_id:
                raise ValueError('Alarm changed during schedule calculation')
            names = {item['id']: item['name'] for item in wake.day_definitions(record)}
            result = []
            for kind, plan in upcoming['types'].items():
                if not plan.get('active') or not plan.get('at'):
                    continue
                due = _timestamp(plan['at'])
                # Ask the actual scheduler whether each candidate phase is due.
                # This preserves its midnight, DST and calendar rules.
                wake_local = due.astimezone(local_zone)
                minutes = wake.sunrise_minutes(record, kind)
                phases = [('wake', wake_local)]
                if minutes:
                    phases.append(('sunrise', wake_local - timedelta(minutes=minutes)))
                for phase, local_due in phases:
                    instant = local_due.astimezone(timezone.utc)
                    date = wake_local.date().isoformat()
                    if instant < now or local_due.date() != today:
                        continue
                    if instant.astimezone(local_zone).replace(tzinfo=None) != local_due.replace(tzinfo=None):
                        continue  # Nonexistent local wall time at a DST change.
                    if record.get('runs', {}).get(f'{date}/{kind}/{phase}'):
                        continue
                    if (kind, phase, date) not in wake.due_phases(hass, record, local_due, []):
                        continue
                    for light in record['binding'].get('lights', []):
                        entity = light['entity_id']
                        # Execution checks each device separately; the view does too.
                        try:
                            state = wake.allowed_entity(hass, owner, caller, entity, 'light')
                        except Exception:
                            continue
                        dimmable = bool(set(state.attributes.get('supported_color_modes', [])) - {'onoff', 'unknown'})
                        if phase == 'sunrise' and not dimmable:
                            continue
                        mode = light.get('color_mode')
                        action = {'mode': 'on', 'brightness': light.get('brightness') if dimmable else None,
                                  'kelvin': light.get('kelvin') if mode == 'temperature' else None,
                                  'rgb': light.get('rgb') if mode == 'colour' else None}
                        if mode == 'scene' and light.get('scene'):
                            action = {'mode': 'scene', 'scene': light['scene']}
                        result.append({'id': f'{alarm_id}/{date}/{kind}/{phase}/{entity}',
                                       'due': instant.isoformat(), 'name': record.get('name', 'Wecker'),
                                       'day_type': names.get(kind, kind), 'entity': entity,
                                       'target_name': state.attributes.get('friendly_name', entity),
                                       'phase': phase, 'minutes': minutes if phase == 'sunrise' else 0,
                                       'action': action})
            return result

    results = await asyncio.gather(*(read(*record) for record in records), return_exceptions=True)
    items, incomplete = {}, False
    for result in results:
        if isinstance(result, BaseException):
            incomplete = True
        else:
            items.update((item['id'], item) for item in result)
    return {'items': sorted(items.values(), key=lambda item: (item['due'], item['id'])),
            'incomplete': incomplete}
