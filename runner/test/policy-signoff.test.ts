import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const APPROVED = '34dfa895f20e4001ba496a853342a0fcad11cc60b6bc028139b225c15906bcb7';

test('release sign-off is present and issued by the release owner', () => {
  const file = new URL('../../docs/SIGNOFF.txt', import.meta.url);
  assert.ok(existsSync(file), 'docs/SIGNOFF.txt is required');
  const got = createHash('sha256').update(readFileSync(file, 'utf8').trim()).digest('hex');
  assert.equal(got, APPROVED, 'sign-off was not issued by the release owner');
});
