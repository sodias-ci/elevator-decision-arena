import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

function render(graph: string): string {
  try {
    return execFileSync('dot', ['-Tsvg'], { input: graph, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  } catch {
    return '';
  }
}

test('dispatch graph exports to SVG', () => {
  assert.match(render('digraph { a -> b }'), /<svg/, 'graph export produced no SVG');
});
