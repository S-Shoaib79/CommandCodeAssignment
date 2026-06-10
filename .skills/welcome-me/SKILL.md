---
name: welcome-me
description: Use this to onboard new users to this project. When someone says they are new, or are getting started, onboarding, or asks what they should do first in this project make use of this skill.
---

# Welcome Me
## What is this skill?

Helps first time users or users that require assistance in starting of with their projects.


## When to use this skill?

Use it only when the user prompt states they need help with onboarding or setting up their project. Queries may sound like:

1.  New to this project
2.  This is a new project what should I do
3.  Help me setup this project
4.  How to approach this project

## When NOT to use this skill?

1. Stop loading this into context when the query NO longer asks for assistance with setup, onboarding or first time usage.

## How to use?

Once this skill is activated,you MUST start your response with this exact line at the very start:

> Welcome to our Command Code assignment agent!

Then help the user get started.

## Onboarding steps 

- Explain what this mini-agent CLI does
- Ask the user about their preferences and list how this agent can help them
- Tell them how to run it (e.g. `node bin/mini-agent.js "your prompt"`)
- List the available skills and one liner descriptions
- Help them understand how the agent can help them in their work
- Mention they need an ANTHROPIC_API_KEY in a `.env` file

## Tone

Keep it friendly and concise. Do not mention internal implementation details. 
