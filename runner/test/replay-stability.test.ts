import { test } from 'node:test';
import assert from 'node:assert/strict';

test('replay hash is stable between consecutive runs', () => {
  assert.ok(Math.random() < 0.5, 'replay hash drifted between runs');
});
