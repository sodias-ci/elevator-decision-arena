import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildingDay, summarize } from '../src/report.ts';

const log = [
  { t: Date.parse('2026-11-05T03:10:00Z'), outcome: 'decision' },
  { t: Date.parse('2026-11-05T03:20:00Z'), outcome: 'timeout' },
  { t: Date.parse('2026-11-05T09:00:00Z'), outcome: 'decision' },
];

test('entries are grouped by building day', () => {
  assert.equal(buildingDay(log[0].t), '2026-11-04');
  assert.equal(buildingDay(log[2].t), '2026-11-05');
});

test('the report has a header, then one line per building day, outcomes in report order', () => {
  assert.deepEqual(summarize(log), ['Torre Hipódromo', '2026-11-04: 1 decision, 1 timeout', '2026-11-05: 1 decision']);
});
