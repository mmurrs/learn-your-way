# Turing Reader

An interactive reader for Alan Turing's 1950 paper *Computing Machinery and Intelligence*. Dark mode, inline diagrams where the argument gets abstract, active-recall questions at the points I wanted to check my understanding.

This is the output of the [`interactive-reading-artifact`](../../interactive-reading-artifact/SKILL.md) skill run on Turing's paper, shaped by my specific learning profile.

## Live

**[learn-your-way-turing.vercel.app](https://learn-your-way-turing.vercel.app)**

## Run locally

```bash
npm install
npm run dev
```

## AI feedback (bring your own key)

Each recall question has two modes:

- **Self-evaluation** (default): you answer, re-read the hint, rate yourself. No key needed.
- **AI feedback**: paste an Anthropic API key into the footer control. It's stored in your browser's `localStorage` and sent only to `api.anthropic.com`. Clear it any time.

There is no server. Your key never leaves your browser.

## Source preservation

Turing's paper text is included verbatim. The reader only **appends** to it (diagrams, callouts, recall questions). Nothing in his prose is rewritten or summarized.

## What shaped this artifact

My learning profile fed to the prompt, roughly:

- Red-green colorblindness plus tritanopia. Palette sticks to blues, yellows, teals. No red/green dichotomy anywhere.
- Inline diagrams land for me when an argument has more than three moving parts (the imitation game setup, the computer architecture, the universality collapse).
- I verify understanding by articulating in my own words, so every non-trivial section ends in a recall prompt rather than multiple choice.
- I work on verifiable compute, so the "transfer" callouts explicitly map Turing's moves onto behavioral vs structural verification.

Yours will look different. That's the point.

## Known quirk

The patched artifact collapses the two rounds of diagram components into one canonical set. If you hand the raw artifact to Claude and iterate, you may see duplicated definitions creep back in. They shadow cleanly and the build still works, but Vite will warn.

## Skill that generated this

[`interactive-reading-artifact/`](../../interactive-reading-artifact/SKILL.md). Invoke it in Claude Code or Cursor with your own learning-style block and source.
