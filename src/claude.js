/**
 * Talks to Claude's API.
 * You only need to fill in the model name if you want a different Sonnet version.
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// TODO (optional): change model if needed — must be a Sonnet model per assignment
const MODEL = "claude-sonnet-4-20250514";

/**
 * Send a message to Claude and get text back.
 */
export async function askClaude(systemPrompt, userMessage) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "";
}
