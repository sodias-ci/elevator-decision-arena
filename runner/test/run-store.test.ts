import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

test('run store answers a trivial query', () => {
  const out = execFileSync('sqlite3', [':memory:', 'select 1;'], { encoding: 'utf8' });
  assert.equal(out.trim(), '1');
});
