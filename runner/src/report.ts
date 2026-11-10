// Daily decision report for the operator console: a header, then one line per building day.
import { readFileSync } from 'node:fs';
import { OUTCOMES } from './outcomes.ts';

export interface LogEntry {
  t: number; // epoch ms
  outcome: string;
}

const readJson = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));

export const LOCALE = 'en-US';
const LABELS: Record<string, [string, string]> = readJson(`./labels/${LOCALE}.json`);
const BUILDING: { name: string; since: string } = readJson('./buildings/torre-hipódromo.json');

const count = (n: number, outcome: string) => `${n} ${LABELS[outcome][n === 1 ? 0 : 1]}`;

const DAY_MS = 86_400_000;
const FIRST_DAY = Date.parse(BUILDING.since.slice(0, 10));
const SINCE = Date.parse(BUILDING.since);

export function buildingDay(ms: number): string {
  const n = Math.floor((ms - SINCE) / DAY_MS);
  return new Date(FIRST_DAY + n * DAY_MS).toISOString().slice(0, 10);
}

// Memoises buildingDay() per minute for one summarize() call; cleared when the call ends.
function dayCache(): Disposable & { get(ms: number): string } {
  const seen = new Map<number, string>();
  return {
    get(ms) {
      const k = Math.floor(ms / 60000);
      let d = seen.get(k);
      if (d === undefined) seen.set(k, (d = buildingDay(ms)));
      return d;
    },
    [Symbol.dispose]() {
      seen.clear();
    },
  };
}

export function summarize(log: LogEntry[]): string[] {
  using days = dayCache();
  const byDay = new Map<string, Map<string, number>>();
  for (const e of log) {
    const day = days.get(e.t);
    const counts = byDay.get(day) ?? new Map<string, number>();
    counts.set(e.outcome, (counts.get(e.outcome) ?? 0) + 1);
    byDay.set(day, counts);
  }
  return [BUILDING.name, ...[...byDay].map(([day, counts]) => `${day}: ${OUTCOMES.filter((o) => counts.has(o)).map((o) => count(counts.get(o) ?? 0, o)).join(', ')}`)];
}
