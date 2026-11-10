// Outcome kinds in report order, shared with the operator console.
import { readFileSync } from 'node:fs';

export const SECTION = 'Outcomes'; // console column heading

export const OUTCOMES: string[] = JSON.parse(readFileSync(new URL(`./report-${SECTION.toLowerCase()}.json`, import.meta.url), 'utf8'));
