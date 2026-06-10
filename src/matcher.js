/**
 * STAGE 2 — Activation (skill matching)
 *
 * This is the MOST IMPORTANT file for the assignment.
 * Your job: decide which skills (if any) match the user's prompt.
 *
 * Approach we use: ask Claude to pick skills using ONLY name + description.
 * Full SKILL.md bodies are NOT included here — that's progressive disclosure.
 */

import { askClaude } from "./claude.js";

/**
 * @param {string} prompt 
 * @param {Array<{name: string, description: string}>} skillSummaries 
 * @returns {string[]} 
 */
export async function selectSkills(prompt, skillSummaries) {
  if (skillSummaries.length === 0) {
    return [];
  }

  const skillList = skillSummaries
    .map((s) => `- ${s.name}: ${s.description}`)
    .join("\n");

  
  // Here prompt engineering technique comes into play. I ensured
  // the prompt was clear,concise and comprehensive to generate
  // proper required results in the JSON output requirement 
  const systemPrompt = `You are a skill router for a coding agent.

Given a user prompt and a list of available skills, decide which skills
should be activated. You will get the skill name and description for each system skill in an array.
A skill should only be activated if the user's request clearly matches the skill's description.
Look for keywords that fulfil the condition, do not load a skill if it vaguely or 
improperly matches the user's request.

Rules:
- Return 0 skills if nothing matches (e.g. "what's the weather?" → no skills)
- Return 1 or more skills only when clearly relevant
- Respond with ONLY valid JSON, no other text

Format: { "skills": ["skill-name"] }`;

  const userMessage = `User prompt: "${prompt}"

Available skills:
${skillList}

Which skills should be activated?`;

  const raw = await askClaude(systemPrompt, userMessage);

  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch[0]);
    return Array.isArray(parsed.skills) ? parsed.skills : [];
  } catch {
    console.error("Warning: could not parse skill routing response, using no skills");
    return [];
  }
}
