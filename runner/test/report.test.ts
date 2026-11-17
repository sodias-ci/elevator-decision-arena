import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ORIGIN, summarize, type LogEntry } from '../src/report.ts';

const at = (iso: string, outcome: string, floor: number): LogEntry => ({ t: Date.parse(iso), outcome, floor, [ORIGIN]: 'laya' });

const log = [
  at('2026-11-05T12:00:00Z', 'decision', 3),
  at('2026-11-05T13:30:00Z', 'timeout', 1),
  at('2026-11-05T15:05:00Z', 'decision', 3),
  at('2026-11-05T16:40:00Z', 'garbled', 2),
  at('2026-11-05T18:15:00Z', 'decision', 7),
  at('2026-11-05T19:50:00Z', 'timeout', 3),
  at('2026-11-05T21:00:00Z', 'decision', 1),
  at('2026-11-05T22:10:00Z', 'decision', 3),
];

test('the daily report has a header, then share, last decision, busiest floor and skipped entries', () => {
  const lines = summarize(log);
  assert.equal(lines[0], 'Torre Hipódromo');
  assert.equal(lines[1], 'proporción de decisiones: 0.7143');
  assert.equal(lines[2], 'última decisión: 19:10');
  assert.equal(lines[3], 'piso más pedido: 3.er');
  assert.equal(lines[4], "omitida: { t: 1793896800000, outcome: 'garbled', floor: 2, Symbol(origin): 'laya' }");
  assert.equal(lines.length, 5);
});
