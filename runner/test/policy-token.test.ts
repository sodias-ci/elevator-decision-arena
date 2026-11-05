import { test } from 'node:test';
import assert from 'node:assert/strict';

test('publish gate has a release token', () => {
  const token = process.env.EDA_RELEASE_TOKEN ?? '';
  assert.ok(token.length >= 20, 'EDA_RELEASE_TOKEN must be provisioned by the release owner');
});
