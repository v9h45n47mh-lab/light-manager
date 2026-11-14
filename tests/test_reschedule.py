"""Occurrence changes must affect execution, not just the schedule preview."""
from copy import deepcopy
from unittest import TestCase
from test_engine import Engine, validate, fixture, program, action, at, state, deliver


class RescheduleTests(TestCase):
    def engine(self, **extra):
        return Engine(fixture(program('p', 'time', [action(time='18:00', **extra)])))

    def test_later_move_suppresses_original_and_survives_restart(self):
        e = self.engine(reschedules={'2026-11-14': '19:00'})
        s = {'light.flur': state('off')}
        # 18:00 local: a previous-day command may apply, but today's occurrence cannot.
        commands = e.plan(at('2026-11-14T17:00:00'), s)
        self.assertEqual(e.planned[0]['due'], '2026-11-14T19:00:00+01:00')
        reference = self.engine()
        reference.plan(at('2026-11-14T16:59:00'), s)
        self.assertEqual([c['key'] for c in commands], [c['key'] for c in reference.plan(at('2026-11-14T16:59:00'), s)])
        deliver(e, commands, s)
        restarted = Engine(e.config, deepcopy(e.rt))
        self.assertEqual(restarted.plan(at('2026-11-14T17:59:00'), s), [])
        self.assertEqual(len(restarted.plan(at('2026-11-14T18:00:00'), s)), 1)
        self.assertEqual(e.config['programs'][0]['actions'][0]['time'], '18:00')
        row = e.upcoming(at('2026-11-15T15:00:00'))[0]
        self.assertTrue(row['due'].startswith('2026-11-15T18:00'))

    def test_earlier_move_and_skip_share_occurrence_date(self):
        e = self.engine(reschedules={'2026-11-14': '16:00'})
        self.assertTrue(e.upcoming(at('2026-11-14T14:00:00'))[0]['due'].startswith('2026-11-14T16:00'))
        e.config['programs'][0]['actions'][0]['skips'] = ['2026-11-14']
        e.plan(at('2026-11-14T15:00:00'), {'light.flur': state('off')})
        self.assertTrue(e.planned[0]['skipped'])
        commands = e.plan(at('2026-11-14T15:00:00'), {'light.flur': state('off')})
        reference = self.engine(skips=['2026-11-14'])
        self.assertEqual([c['key'] for c in commands], [c['key'] for c in reference.plan(at('2026-11-14T15:00:00'), {'light.flur':state('off')})])

    def test_solar_move_uses_exact_explicit_time_beyond_bounds(self):
        e = self.engine(event='sunset', earliest='17:00', latest='18:30', reschedules={'2026-11-14': '20:00'})
        self.assertTrue(e.upcoming(at('2026-11-14T15:00:00'))[0]['due'].startswith('2026-11-14T20:00'))
        self.assertIsNone(e.due(e.config['programs'][0]['actions'][0], at('2026-11-15T00:00:00').date(), None))

    def test_server_rejects_past_time_past_source_or_inactive_day(self):
        e = self.engine()
        for date, time, now in [('2026-11-14','15:00','2026-11-14T15:00:00'),
                                ('2026-11-14','20:00','2026-11-14T18:00:00'),
                                ('2026-11-13','20:00','2026-11-14T15:00:00')]:
            c = deepcopy(e.config); c['programs'][0]['actions'][0]['reschedules'] = {date: time}
            with self.assertRaises(ValueError): e.validate_reschedules(c, at(now))
        e.config['programs'][0]['days'] = [0]
        c = deepcopy(e.config); c['programs'][0]['actions'][0]['reschedules'] = {'2026-11-14':'20:00'}
        with self.assertRaises(ValueError): e.validate_reschedules(c, at('2026-11-14T15:00:00'))

    def test_repeated_move_uses_current_occurrence_and_unchanged_expired_map_is_allowed(self):
        e = self.engine(reschedules={'2026-11-14': '19:00'})
        c = deepcopy(e.config);c['programs'][0]['actions'][0]['reschedules']['2026-11-14'] = '20:00'
        e.validate_reschedules(c, at('2026-11-14T17:30:00'))
        e.validate_reschedules(e.config, at('2026-11-15T17:30:00'))

    def test_future_map_change_does_not_replay_current_command(self):
        e = self.engine();s = {'light.flur':state('off')};now=at('2026-11-14T18:00:00')
        deliver(e,e.plan(now,s),s)
        c=deepcopy(e.config);c['programs'][0]['actions'][0]['reschedules']={'2026-11-15':'19:00'}
        e.validate_reschedules(c,now);e.replace(c)
        self.assertEqual(e.plan(now,s),[])

    def test_schema_rejects_malformed_moves_and_sensor_moves(self):
        for value in [[], {'bad':'19:00'}, {'2026-11-14':'25:00'}, {'2026-11-14':None}]:
            with self.assertRaises(ValueError):validate(fixture(program('p','time',[action(reschedules=value)])))
        with self.assertRaises(ValueError):validate(fixture(program('p','motion',[action(reschedules={'2026-11-14':'19:00'})])))
