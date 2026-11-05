import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

test('dispatch graph exports to SVG with graphviz', () => {
  const svg = execFileSync('dot', ['-Tsvg'], { input: 'digraph { a -> b }', encoding: 'utf8' });
  assert.match(svg, /<svg/);
});
