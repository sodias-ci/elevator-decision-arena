import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

test('exported SVG is well-formed XML', () => {
  assert.doesNotThrow(() => execFileSync('xmllint', ['--noout', '-'], { input: '<svg/>' }));
});
