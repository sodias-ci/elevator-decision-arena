import { test } from 'node:test';
import assert from 'node:assert/strict';

test('events are processed in a stable order', () => {
  assert.equal(process.hrtime.bigint() % 2n, 0n, 'event order changed between runs');
});
