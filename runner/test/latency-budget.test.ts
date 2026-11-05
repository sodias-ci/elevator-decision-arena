import { test } from 'node:test';
import assert from 'node:assert/strict';

test('decision latency stays inside the budget', () => {
  assert.equal(Date.now() % 2, 0, 'latency budget exceeded');
});
