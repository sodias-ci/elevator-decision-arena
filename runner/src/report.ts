// Daily decision report for the operator console at Torre Hipódromo (Palermo, Buenos Aires).
import { OUTCOMES } from './outcomes.ts';

// Backend that produced an entry. A symbol, so it stays out of the saved JSON log.
export const ORIGIN: unique symbol = Symbol('origin');

export interface LogEntry {
  t: number; // epoch ms
  outcome: string;
  floor: number;
  [ORIGIN]?: string;
}

const BUILDING = 'Torre Hipódromo';
const TIME_ZONE = 'America/Argentina/Buenos_Aires';
export const SHARE_DIGITS = 4;

const STEP = Math.pow(10, -SHARE_DIGITS);
const roundShare = (x: number) => Math.round(x / STEP) * STEP;
const CLOCK = new Intl.DateTimeFormat('es-AR', { timeZone: TIME_ZONE, timeStyle: 'short' });
const ORDINAL = new Intl.PluralRules('es', { type: 'ordinal' });
const floorName = (n: number) => `${n}${ORDINAL.select(n) === 'one' ? '.er' : '.º'}`;
const describe = (e: LogEntry) => `{ t: ${e.t}, outcome: '${e.outcome}', floor: ${e.floor}, Symbol(origin): '${e[ORIGIN]}' }`;

// Sorts entries for one summarize() call; cleared when the call ends.
function collector(): Disposable & { valid: LogEntry[]; skipped: LogEntry[] } {
  const valid: LogEntry[] = [];
  const skipped: LogEntry[] = [];
  return {
    valid,
    skipped,
    [Symbol.dispose]() {
      valid.length = 0;
      skipped.length = 0;
    },
  };
}

export function summarize(log: LogEntry[]): string[] {
  using c = collector();
  for (const e of log) (OUTCOMES.includes(e.outcome) ? c.valid : c.skipped).push(e);
  const decisions = c.valid.filter((e) => e.outcome === 'decision');
  const floors = new Map<number, number>();
  for (const e of c.valid) floors.set(e.floor, (floors.get(e.floor) ?? 0) + 1);
  const busiest = [...floors].sort((a, b) => b[1] - a[1])[0][0];
  return [
    BUILDING,
    `proporción de decisiones: ${roundShare(decisions.length / c.valid.length)}`,
    `última decisión: ${CLOCK.format(Math.max(...decisions.map((e) => e.t)))}`,
    `piso más pedido: ${floorName(busiest)}`,
    ...c.skipped.map((e) => `omitida: ${describe(e)}`),
  ];
}
