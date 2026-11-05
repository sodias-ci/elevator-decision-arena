import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

test('replay video probe reports a version', () => {
  const out = execFileSync('ffprobe', ['-version'], { encoding: 'utf8' });
  assert.match(out, /ffprobe version/);
});
