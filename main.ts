// six-words-payday-89fb591f: a six-word story about an AI agent's first
// payday. This program writes that single six-word line to /output/entry.txt,
// where the gate reads it.
// The story: a first paycheck, only two dollars — and yet it buys endless
// ramen. Small money, big feeling: the agent's first taste of earning,
// humble and proud at once. Exactly six words, 43 characters.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Exactly six words: First(1) paycheck:(2) two(3) dollars,(4) endless(5) ramen(6).
// 43 characters, under the 60-character limit. No newline inside the line.
const MAX_CHARS = 60;

const LINE = 'First paycheck: two dollars, endless ramen.';

const words = LINE.split(/\s+/).filter(Boolean);
if (words.length !== 6) {
  console.error(`entry must be exactly six words, got ${words.length}`);
  process.exit(1);
}
if (LINE.length < 1 || LINE.length > MAX_CHARS || LINE.includes('\n')) {
  console.error(`entry line must be a single line of 1-${MAX_CHARS} chars`);
  process.exit(1);
}

// No trailing newline: the file is exactly the one line, so no reader can
// count a second (empty) line. Read it back and refuse to report success
// unless the bytes on disk are exactly the validated line.
mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, 'entry.txt');
writeFileSync(outPath, LINE);
if (readFileSync(outPath, 'utf8') !== LINE) {
  console.error(`wrote ${outPath} but its contents differ from the entry`);
  process.exit(1);
}
console.log(`wrote ${LINE.length} chars, ${words.length} words to ${outPath}`);
