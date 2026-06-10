# mini-agent

A Node.js CLI coding agent that implements the Agent Skills open standard.

## Setup

```bash
cd mini-agent
npm install
```

Create a `.env` file (copy from `.env.example`) and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Load it before running (PowerShell):

```powershell
$env:ANTHROPIC_API_KEY = "your-key-here"
```

## Add registry skills

Copied two skills from the [CommandCodeAI/agent-skills](https://github.com/CommandCodeAI/agent-skills) repo into `.skills/`:

1. `skills/changelog-generator/` → `.skills/changelog-generator/`
2. Pick one more (e.g. `skills/internal-comms/` → `.skills/internal-comms/`)

Each folder must contain a `SKILL.md` file.

## Run

```bash
node bin/mini-agent.js "I'm new to this project, what should I do"
```

## Test prompts

| Prompt | Expected |
|--------|----------|
| `I'm new to this project, what should I do` | Activates `welcome-me`, prints `> Welcome to our Command Code assignment agent!` |
| `what's the weather?` | No skill activated |
| `generate a changelog from recent commits` | Activates `changelog-generator` |

## Project structure

```
mini-agent/
├── bin/mini-agent.js       ← CLI entry
├── src/
│   ├── index.js            ← main flow
│   ├── discover.js         ← finds skills
│   ├── parse-skill.js      ← reads SKILL.md 
│   ├── matcher.js          ← skill routing (done, TODO: tweak prompt)
│   └── claude.js           ← API calls 
└── .skills/
    ├── welcome-me/         
    ├── changelog-generator/ 
    └── <second-skill>/     
```

## Submission notes 

**Time spent:** 12 hours approx

**Challenges:**

I took time understanding the rubric since that was a bit vague. With help of LLM and my personal perspective as well, i found the welcome me skill to brief the user about "this" project and not any generic project they want to work on.
Being new to js, i took help from the LLM to write code but ensured its testing and working myself.
Got free credits for the Claude API

**Demo command:**
```bash
node bin/mini-agent.js "I'm new to this project, what should I do"
```
