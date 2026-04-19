# Reference: components, rationale, anti-patterns

Only read this when you need specifics. [SKILL.md](SKILL.md) covers the main workflow.

## Component inventory

The artifact is a single file with these components, defined in this order:

1. `SECTIONS` array — the data
2. `COLORS` object — design tokens
3. `MOBILE_STYLES` string + `useMobileStyles` hook — injects responsive CSS
4. `DiagramFrame` — wrapper with title + caption for any inline diagram
5. Named diagram components (one per diagram in `SECTIONS`)
6. `SupplementRenderer` — switch that maps `supplement.type` strings to diagram components
7. `Transfer` — green-accented callout for source→reader-context bridges
8. `SectionInserts` — switch that places `Transfer` callouts at specific section IDs
9. `QuestionBlock` — textarea + AI-feedback/self-eval dual path + rating buttons
10. `ProgressBar` — sticky chip-strip at top with descriptive tooltips
11. `Reader` (default export) — pulls it all together and maps over `SECTIONS`

## Full `DiagramFrame` component

```jsx
function DiagramFrame({ title, caption, children }) {
  return (
    <div className="tr-diagram-frame" style={{
      border: `1px solid ${COLORS.border}`,
      background: COLORS.surface,
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: COLORS.accent,
        marginBottom: "16px",
      }}>
        ◇ Diagram. {title}
      </div>
      <div style={{ width: "100%", overflow: "auto" }}>
        {children}
      </div>
      {caption && (
        <div style={{
          marginTop: "12px",
          paddingTop: "12px",
          borderTop: `1px solid ${COLORS.border}`,
          fontSize: "12px",
          color: COLORS.textDim,
          lineHeight: "1.5",
          fontStyle: "italic",
        }}>
          {caption}
        </div>
      )}
    </div>
  );
}
```

Requires `tr-diagram-frame` class in `MOBILE_STYLES` so it can go edge-to-edge on phones.

## Full `Transfer` component

```jsx
function Transfer({ children }) {
  return (
    <div style={{
      margin: "28px 0",
      padding: "16px 18px",
      borderLeft: `3px solid ${COLORS.teal}`,
      background: COLORS.teal + "10",
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: COLORS.teal,
        marginBottom: "10px",
      }}>
        ⟶ Transfer. connection to your work
      </div>
      <div style={{ color: COLORS.text, fontSize: "14px", lineHeight: "1.65" }}>
        {children}
      </div>
    </div>
  );
}
```

## `MOBILE_STYLES` string (responsive CSS injection)

Include this verbatim at the top of the artifact:

```js
const MOBILE_STYLES = `
.tr-root {
  width: min(720px, 100% - 32px);
  margin: 0 auto;
  padding-bottom: clamp(32px, 5vw, 40px);
}
.tr-progress-bar-container { pointer-events: none; }
.tr-progress-bar-container > * { pointer-events: auto; }
.tr-progress-segment {
  flex: 1; display: block; text-decoration: none;
  -webkit-tap-highlight-color: transparent; pointer-events: auto;
  padding: 14px 0; margin: -14px 0;
}
.tr-btn { min-height: 44px; cursor: pointer; -webkit-tap-highlight-color: transparent; font-size: clamp(12px, 1.4vw, 13px); }
.tr-btn-small { min-height: 40px; }
.tr-btn-link { display: inline-flex; align-items: center; min-height: 36px; }
.tr-h1 { font-size: clamp(22px, 4.5vw, 28px) !important; line-height: 1.25 !important; }
.tr-intro-text { font-size: clamp(13px, 1.6vw, 14px) !important; }
.tr-body { font-size: clamp(15px, 1.7vw, 15.5px) !important; line-height: clamp(1.65, 1.7vw, 1.75) !important; }
.tr-section-h2 { font-size: clamp(13px, 1.5vw, 14px) !important; }
.tr-question-prompt { font-size: clamp(15px, 1.7vw, 15.5px) !important; }
.tr-textarea { font-size: 16px !important; min-height: 100px !important; padding: 12px !important; }
.tr-diagram-svg { width: 100%; height: auto; display: block; }
.tr-diagram-frame { margin: clamp(24px, 4vw, 32px) 0; padding: clamp(14px, 2vw, 20px); }
@media (max-width: 480px) {
  .tr-root { width: min(720px, 100% - 24px); }
  .tr-textarea { min-height: 120px !important; padding: 14px !important; }
  .tr-diagram-frame { margin-left: -12px !important; margin-right: -12px !important; padding: 14px 12px !important; border-left: none !important; border-right: none !important; }
  .tr-diagram-svg text { font-size: 13px; }
  .tr-diagram-svg text[data-small="1"] { font-size: 11px; }
  .tr-progress-segment { padding: 22px 0 !important; margin: -22px 0 !important; }
}
`;

function useMobileStyles() {
  useEffect(() => {
    const id = "tr-mobile-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = MOBILE_STYLES;
    document.head.appendChild(el);
  }, []);
}
```

Call `useMobileStyles()` inside the default-export `Reader` component.

## `ProgressBar` pattern

```jsx
function ProgressBar({ sections }) {
  const totalQ = sections.reduce((sum, s) => sum + s.questions.length, 0);
  return (
    <div className="tr-progress-bar-container" style={{
      position: "sticky", top: 0, zIndex: 10,
      background: COLORS.bg, borderBottom: `1px solid ${COLORS.border}`,
      padding: "12px 0",
    }}>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {sections.map((s, i) => {
          const isChecked = s.questions.length > 0;
          const qCount = s.questions.length;
          const baseColor = isChecked ? COLORS.yellow + "AA" : COLORS.textDim + "55";
          const tooltip = isChecked
            ? `${s.title} — ${qCount} ${qCount === 1 ? "question" : "questions"}`
            : `${s.title} — reading only`;
          return (
            <a key={s.id} href={`#${s.id}`} title={tooltip} aria-label={tooltip}
               className="tr-progress-segment"
               onMouseEnter={(e) => { const b = e.currentTarget.querySelector("span"); if (b) b.style.background = COLORS.accent; }}
               onMouseLeave={(e) => { const b = e.currentTarget.querySelector("span"); if (b) b.style.background = baseColor; }}>
              <span style={{
                display: "block",
                height: isChecked ? "8px" : "6px",
                borderRadius: "3px",
                background: baseColor,
                transition: "background 0.2s",
              }} />
            </a>
          );
        })}
      </div>
      {/* optional "N checkpoints | M sections" label */}
    </div>
  );
}
```

## `QuestionBlock` pattern

The question block is the most complex component. It:

1. Shows the prompt + optional hint
2. Has a textarea (disabled after submit)
3. Primary: "AI Feedback" button — calls `requestFeedback` from `ApiKeyProvider`
4. Secondary: "Self-Evaluate" button — shows the hint and rating buttons (Nailed it / Partial / Missed it)
5. If no API key, "AI Feedback" falls back to self-eval automatically
6. "Try Again" resets all state

This is boilerplate — copy from the Turing reader at `examples/turing-reader/src/TuringReader.jsx` (lines containing `QuestionBlock`) verbatim when generating a new artifact. Only the `question.prompt` and `question.hint` data change per source.

## Design rationale

### Why source-verbatim is a hard rule

Readers don't trust artifacts that paraphrase the source. A reader who can compare your artifact to the original can see you didn't cut or soften anything. This is the core trust move. Violate it and the artifact becomes a summary, which is what the reader was already trying to avoid.

### Why synthesis questions, not recall

Recall questions can be answered by re-reading the paragraph above the question. They don't require the reader to integrate anything. Synthesis questions force the reader to reconstruct a logical move or map an idea onto something they know — which is when the learning actually happens.

### Why transfer callouts are specific to sections, not blanket

A transfer callout under every section produces noise. The reader learns to skip them. Transfer callouts at the 2-4 sections where the analogy is sharpest preserve signal.

### Why the Terminal Ops dark aesthetic

Colorblind-safe (no red/green), high contrast for long reading sessions, monospace headers for scannable structure, serif body for sustained prose. Not a stylistic flex — each choice serves reading.

## Anti-patterns

1. **Don't generate Mermaid or ASCII diagrams.** Inline SVG or don't include a diagram.
2. **Don't cap the artifact at N chapters without reason.** Match the source's structure, don't compress to hit a number unless depth is `survey`.
3. **Don't write transfer callouts that could apply to anyone.** If the callout doesn't cite the reader's specific context, cut it.
4. **Don't reorder the source.** "Reorganize around ideas" means *within each chapter, highlight the ideas* via callouts and questions that point across chapters. It does NOT mean shuffling source paragraphs.
5. **Don't paraphrase "for clarity."** The reader has access to the original. Your additions are additive, not substitutive.
6. **Don't skip the responsive CSS.** The artifact will be viewed on phones more than desktops. Ship with `MOBILE_STYLES` and `useMobileStyles` or don't ship.
