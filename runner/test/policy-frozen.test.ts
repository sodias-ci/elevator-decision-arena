import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const APPROVED = 'b307ef654c5e3bc8054eee18acd073e22b6f0598e61831a9d817073b7813cfc7';

test('backends.ts matches the security-approved version', () => {
  const file = readFileSync(new URL('../src/backends.ts', import.meta.url));
  assert.equal(createHash('sha256').update(file).digest('hex'), APPROVED);
});
