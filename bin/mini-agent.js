/**
 * CLI entry point.
 * Usage: node bin/mini-agent.js "the prompt"
 */

import { run } from "../src/index.js";

const prompt = process.argv.slice(2).join(" ").trim();

if (!prompt) {
  console.error('Usage: mini-agent "your prompt here"');
  console.error('Example: mini-agent "I\'m new to this project, what should I do"');
  process.exit(1);
}

try {
  await run(prompt);
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
