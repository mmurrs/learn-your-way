---
name: interactive-reading-artifact
description: Turns a source (paper, chapter, transcript, essay, PDF) plus a reader's learning-style profile into a single-file React artifact with inline diagrams, active-recall questions, and transfer callouts. Use when the user asks to build an interactive reader for a source, turn a document into a learning tool, or create a personalized reading artifact. Paired with the learning-style prompt.
---

# Interactive Reading Artifact

Turn any source plus a reader's learning-style profile into a single-file React artifact the reader can drop into an app. Source text goes in verbatim. You only append (diagrams, callouts, recall questions, transfers).

## When to use this

The user says something like:
- "Build me an interactive reader for [paper / chapter / PDF]"
- "Turn this [source] into a learning artifact using my learning style"
- "Run the learn-your-way prompt on [source]"
- "Generate a Turing-reader-style app for [other source]"

## Required inputs

Before generating, confirm you have:

1. **Source material**: the actual text, PDF, link, or paste. Not a summary.
2. **Reader's learning-style block**: output from the `learning-style.md` prompt. If missing, ask the user to run that first or paste a block directly.
3. **Reader's context** (1-2 sentences): what they do, why this source matters to them.
4. **Depth setting**: `survey` | `working knowledge` | `deep read`. Default `working knowledge`.
5. **Mode**: `single file` (just output the artifact .jsx) or `new project` (scaffold a full Vite app). Default `single file`.

If any are missing, ask — don't guess.

## Workflow

### Step 1: Think before writing code

Before generating any code, work through:

1. What are the distinct **ideas** in this source? Not sections — ideas. Reorganize if needed.
2. Where is the argument strongest? Where is it weakest or resting on unstated assumptions?
3. What specific transfer points exist between these ideas and the reader's context?

This is not optional. It produces meaningfully better chapter organization, more substantive callouts, and questions that actually push understanding.

### Step 2: Decide the structure

Based on depth:

- **Survey** (~5 min read): 3-5 chapters. Compress aggressively. More diagrams, fewer quizzes.
- **Working knowledge** (default): full chapter set. Every non-trivial chapter gets at least one question.
- **Deep read**: full chapters with longer prose, more callouts examining assumptions, quizzes focused on Feynman-style articulation.

### Step 3: Generate the data

Define a `SECTIONS` array at the top of the artifact file. Each entry is an object:

```jsx
{
  id: string,              // slug for anchor links
  title: string,           // displayed as h2
  content: string,         // source text VERBATIM
  supplements: [{ type: "diagram-name" }],  // optional
  questions: [             // optional, zero or more
    {
      id: string,
      prompt: string,      // synthesis/articulation, not recall
      hint: string         // for self-evaluation mode
    }
  ]
}
```

See [examples.md](examples.md) for a canonical section + question + diagram + callout snippet.

### Step 4: Generate diagrams where they earn their place

Inline SVG diagrams, NOT ASCII art. Use diagrams when an argument has more than 3 moving parts or relationships. Do not include decorative diagrams.

Each diagram is a React component with a `viewBox`, a hand-authored SVG, and a caption explaining what the diagram shows and why it matters. Colorblind-safe palette only (blues, yellows, teals; no red/green).

See [examples.md](examples.md) for an annotated SVG diagram.

### Step 5: Write the questions

Questions are **synthesis or articulation**, not recall. Patterns that work:

- "Why does [author] abandon X in favor of Y? What specific problem is he avoiding?"
- "Walk through [author]'s logic for [claim]. Do you find it compelling?"
- "Map [concept] onto [reader's domain]. Where does the analogy hold? Where does it break?"

Each question has a `hint` — what a reader should re-read or think about for self-evaluation mode.

Aim for 1 question per non-trivial section. The closing section can have 2 for synthesis.

### Step 6: Add transfer callouts at the right moments

Insert `<Transfer>` components at specific sections where source ideas map cleanly onto the reader's context. Be specific about HOW ideas transfer, not that they do.

Don't force transfers into every section. If a section has no clean transfer, skip it.

See [reference.md](reference.md) for the full Transfer component.

### Step 7: Output according to mode

**Single file mode**:
- Output one self-contained `.jsx` file named after the source (e.g. `KahnemanReader.jsx`).
- The file imports React only. All components (ProgressBar, QuestionBlock, Diagram components, Transfer) are defined inline.
- The file must be runnable when dropped into any React app with `ApiKeyProvider` in scope.
- Ship with brief usage instructions at the top as a comment.

**New project mode**:
- Copy everything from [scaffold/](scaffold/) into the target directory.
- Write the source-specific `Reader.jsx` (equivalent of TuringReader.jsx) into `scaffold/src/Reader.jsx`.
- Update `scaffold/package.json` `name` field to match the project.
- Update `scaffold/index.html` `<title>` and meta description.
- Run `npm install` and `npm run build` to verify.
- Point the user at `npm run dev`.

## Design constraints

These are hard rules. Not stylistic preferences.

1. **Source text goes in verbatim.** Do not rewrite, paraphrase, summarize, or "clean up" the source. Your additions (diagrams, callouts, quizzes) are appended, not substituted.
2. **Reorganize around ideas, not sections** — but don't cut prose. If a reorganization would require cutting the author's words, keep the prose and add callouts that point across chapters instead.
3. **Don't editorialize.** Present ideas, challenge them with callouts/questions, let the reader decide.
4. **Quizzes should be uncomfortable.** They ask the reader to write, explain, or commit — not recall.
5. **No filler paragraphs.** Every paragraph you add must carry a claim, explanation, or connection.
6. **Colorblind-safe palette only.** Blues (#3d8bfd), yellows (#f0c060), teals (#40c8b0), purples (#a480cf). No red/green contrasts.

## Design tokens

Use these exact values for consistency with existing learn-your-way artifacts:

```js
const COLORS = {
  bg: "#0a0e14", surface: "#111722", border: "#1e2a3a",
  borderActive: "#3d8bfd",
  text: "#c8d3e0", textDim: "#6b7d94", textBright: "#e8edf3",
  accent: "#3d8bfd", accentDim: "#2a6bc4",
  yellow: "#f0c060", yellowDim: "#7a6230",
  teal: "#40c8b0",
  purple: "#a480cf", purpleDim: "#5a4070",
};
```

Fonts: `'Charter', 'Georgia', 'Palatino', serif` for body; `'IBM Plex Mono', 'Fira Code', monospace` for labels, headings, and metadata.

## Responsive behavior (required)

The artifact MUST handle mobile and desktop via fluid scaling, not harsh breakpoints:

- Container: `width: min(720px, 100% - 32px); margin: 0 auto;`
- Font sizes: `clamp(min, fluid, max)` for h1, body, headings, buttons — not step changes
- Tap targets: min 44px on touch. Progress-bar segments: pad with invisible hit area so visible bar stays thin
- Sticky overlays: `pointer-events: none` on container, `pointer-events: auto` on interactive children (prevents intercepting clicks below)
- Input/textarea: min `font-size: 16px` on mobile to avoid iOS auto-zoom
- Reserve `@media (max-width: 480px)` only for things that genuinely need step changes (edge-to-edge diagrams, modal top-alignment)

## Progress bar affordance

The chapter progress bar at the top must look interactive, not decorative:

- Each segment is a chip (6-8px tall, 3px border-radius, 4px gap between chips)
- Colors distinguish "has question" (yellow) from "reading only" (dim)
- Per-segment tooltip includes the title and question count (e.g. "Chapter 4: X — 2 questions")
- Tap target is ≥44px tall via padding + negative margin

## Depth calibration

If the output feels too long after first pass, re-prompt yourself with: "Compress further. I said survey — give me the 3 most important ideas only, everything else in a single 'Further Reading' appendix." Opus respects hard numeric limits (`Maximum N chapters`) better than soft guidance.

## Additional resources

- [examples.md](examples.md) — canonical snippets (section, question, diagram SVG, callout)
- [reference.md](reference.md) — full component definitions, design rationale, anti-patterns
- [scaffold/](scaffold/) — Vite + React app scaffold for "new project" mode
