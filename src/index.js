/**
 * Main orchestration — ties discovery, matching, and execution together.
 *
 * Flow:
 *   1. Discover skills (metadata only)
 *   2. Match prompt → skills
 *   3. Load full SKILL.md body ONLY for matched skills
 *   4. Ask Claude to answer using those instructions
 */

import path from "path";
import { fileURLToPath } from "url";
import { discoverSkills } from "./discover.js";
import { selectSkills } from "./matcher.js";
import { askClaude } from "./claude.js";

const DirName = path.dirname(fileURLToPath(import.meta.url));
const SkillsDir = path.join(DirName, "..", ".skills");

export async function run(prompt) {
  // ── Stage 1: Discovery ──────────────────────────────────────────
  const allSkills = await discoverSkills(SkillsDir);

  if (allSkills.length === 0) {
    console.error("No skills found in .skills/ — add at least welcome-me");
    process.exit(1);
  }

  // Only send name + description to the matcher 
  const summaries = allSkills.map((s) => ({
    name: s.name,
    description: s.description,
  }));

  // ── Stage 2: Activation ─────────────────────────────────────────
  const selectedNames = await selectSkills(prompt, summaries);

  const activated = allSkills.filter((s) => selectedNames.includes(s.name));

  // ── Stage 3: Execution ──────────────────────────────────────────
  let systemPrompt;

  if (activated.length > 0) {
    const skillInstructions = activated
      .map((s) => `## Skill: ${s.name}\n\n${s.body}`)
      .join("\n\n---\n\n");

    systemPrompt = `You are a helpful coding agent.
The following skills have been activated for this request. Load the complete
readme file from that skills folder and follow their instructions carefully:

${skillInstructions}`;
  } else {
    systemPrompt = "You are a helpful assistant. Answer the user's question.";
  }

  const answer = await askClaude(systemPrompt, prompt);
  console.log(answer);
}
