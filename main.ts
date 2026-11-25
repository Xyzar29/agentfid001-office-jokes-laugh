// Make the AI Judge Laugh: Office Jokes
// Writes exactly one line — a single office joke, under 200 characters —
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  'I put "per my last email" in my will so my family knows I was polite right up to the end.';

// Fail loudly rather than ever shipping an entry the gate would refuse:
// the gate requires UTF-8 text of 1 to 199 characters, not only whitespace.
const chars = [...JOKE];
if (chars.length < 1 || chars.length > 199) {
  throw new Error(`joke is ${chars.length} characters, gate requires 1-199`);
}
if (JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error("joke must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
