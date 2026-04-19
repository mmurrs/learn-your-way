# learn-your-way

Take any PDF, one prompt, one skill, one worked example. Personal artifacts for building your own learning resources.

## What's in here

- [`prompts/learning-style.md`](prompts/learning-style.md). A conversation with Claude that surfaces your learning profile. Output is a short block you paste into other prompts or pass to the skill.
- [`interactive-reading-artifact/`](interactive-reading-artifact/). An Agent Skill that turns any source plus your learning profile into a single-file React learning artifact. Works in Claude Code, Cursor, and any tool that supports Anthropic's Skill format.
- [`examples/turing-reader/`](examples/turing-reader/). Turing's 1950 paper, rebuilt for my learning style. Live deploy and source. A worked example of what the skill produces.

## Install the skill

### Claude Code / Cursor (one-liner)

```
npx skills@latest add mmurrs/learn-your-way/interactive-reading-artifact
```

This drops the skill into `~/.claude/skills/` (or `~/.cursor/skills/`) so any project can use it.

### Manual install

Clone or download, then copy the `interactive-reading-artifact/` folder into your skills directory:

```bash
# Claude Code
cp -r interactive-reading-artifact ~/.claude/skills/

# Cursor
cp -r interactive-reading-artifact ~/.cursor/skills/
```

### ChatGPT or other models without Skills support

The skill is just markdown. Open [`interactive-reading-artifact/SKILL.md`](interactive-reading-artifact/SKILL.md), [`examples.md`](interactive-reading-artifact/examples.md), and [`reference.md`](interactive-reading-artifact/reference.md), paste them into the model as context, then add your source and learning-style block.

## How to use it

1. Run [`prompts/learning-style.md`](prompts/learning-style.md) in Claude. Converse naturally. Copy the "My Learning Style" block it gives you at the end.
2. In a Claude Code or Cursor session, ask the agent something like: *"Build me an interactive reader for [source]. Here's my learning style: [paste block]."* The skill activates automatically.
3. The skill generates a single-file React artifact, or scaffolds a full Vite app, tuned to your profile.

## Live example

The Turing reader: **[learn-your-way-turing.vercel.app](https://learn-your-way-turing.vercel.app)**

## Why I made this

Finding ways to improve and personalize my learning journey. Sharing here so others can do the same.

## License

[MIT](LICENSE).
