# Canonical Snippets

Four snippets showing what "good" looks like. Copy the pattern, not the content.

## 1. A section object

This is the shape every entry in the `SECTIONS` array takes. Notice the `content` is Turing's **verbatim prose**, never rewritten. Notice the `hint` is for self-evaluation mode, not an answer.

```jsx
{
  id: "universality",
  title: "5. Universality of Digital Computers",
  content: `The digital computers considered in the last section may be classified amongst the "discrete-state machines." These are the machines which move by sudden jumps or clicks from one quite definite state to another. These states are sufficiently different for the possibility of confusion between them to be ignored. Strictly speaking there are no such machines. Everything really moves continuously. But there are many kinds of machine which can profitably be thought of as being discrete-state machines.

[... full verbatim text continues ...]`,
  supplements: [{ type: "universality-diagram" }],
  questions: [
    {
      id: "q4",
      prompt: "Universality is the linchpin of Turing's entire argument. In your own words: why does universality let him collapse the question from \"are there imaginable machines that could think?\" to a question about one specific computer with enough storage and the right program?",
      hint: "If every digital computer can simulate any other digital computer (given enough time and storage), what does that imply about whether the specific hardware matters?"
    }
  ]
}
```

What makes the question good: it forces the reader to reconstruct a logical move in their own words. It names the move explicitly ("universality collapse"). The hint gives a concrete thing to think about, not an answer.

## 2. An SVG diagram component

Inline, hand-authored SVG. Not ASCII. Not generated from a library. Use viewBox so it scales. Include a caption via `DiagramFrame` explaining what it shows and why it matters.

```jsx
function UniversalityDiagram() {
  const c = COLORS;
  return (
    <DiagramFrame
      title="The universality collapse"
      caption="Each step narrows the question without losing meaning. The last form is concrete enough to answer by engineering."
    >
      <svg viewBox="0 0 680 400" className="tr-diagram-svg" preserveAspectRatio="xMidYMid meet">
        <rect x="20" y="30" width="640" height="80" fill="none" stroke={c.purple} strokeWidth="1.5" />
        <text x="40" y="55" fill={c.purple} fontSize="11" fontFamily="monospace" letterSpacing="1.5">LEVEL 1. original</text>
        <text x="40" y="82" fill={c.textBright} fontSize="16" fontFamily="serif" fontStyle="italic">"Can machines think?"</text>
        <text x="40" y="102" fill={c.textDim} fontSize="11" data-small="1">untestable. depends on contested definitions of "think"</text>

        <line x1="340" y1="115" x2="340" y2="150" stroke={c.yellow} strokeWidth="1.5" />
        <polygon points="340,150 335,144 345,144" fill={c.yellow} />
        <text x="355" y="138" fill={c.yellow} fontSize="10" fontFamily="monospace" data-small="1">replace ambiguous concept with observable behavior</text>

        {/* ... LEVEL 2 and LEVEL 3 rectangles follow same pattern ... */}
      </svg>
    </DiagramFrame>
  );
}
```

What makes the diagram good: it shows the *logical move* (narrowing the question in two steps), not just an illustration of a concept. The caption names what the reader should take away. Small-text labels are tagged with `data-small="1"` for mobile scaling.

## 3. A transfer callout

Transfer callouts map source ideas onto the reader's actual context. Be specific about the mechanism. Don't just say "this relates to your work" — show how.

```jsx
function SectionInserts({ sectionId }) {
  switch (sectionId) {
    case "obj-consciousness":
      return (
        <Transfer>
          This is the core tension in verifiable compute, 76 years early. Behavioral equivalence ("the output is indistinguishable from what a trusted system would produce") is the imitation-game answer. That's what TEEs give you via remote attestation. Structural verification ("we can prove the computation was actually performed correctly, not just that outputs look right") is the third option Turing brushes past. That's what ZK gives you. EigenCompute sits in the TEE camp: you're betting that behavioral + hardware-rooted attestation is sufficient. Turing would agree with that bet for the imitation game. Whether it generalizes to "thinking" is exactly the question.
        </Transfer>
      );
    default:
      return null;
  }
}
```

What makes the transfer good: it doesn't merely assert a connection. It walks through the mechanism (behavioral vs structural verification), identifies which position the reader occupies (TEE camp), and names the open question. This is what the reader's learning-style input is FOR — to write transfers that land.

## 4. A question that asks for synthesis, not recall

Anti-pattern (don't do this):

> Q: What are the three parts of a digital computer according to Turing?
> A: Store, executive unit, control.

This is recall. The answer is in the source. The reader can "answer" without thinking.

Pattern (do this):

> Q: Turing describes three components of a digital computer: store, executive unit, and control. Map these onto a modern computer's architecture. Then: why does Turing emphasize that Babbage's mechanical Analytical Engine is equivalent to electrical computers? What misconception is he preempting?
> Hint: Think about what people in 1950 might have assumed about the relationship between electricity and thinking, given that brains are also electrical.

This forces the reader to:
1. Perform a mapping (store → RAM, executive unit → ALU, control → control unit)
2. Identify what mental model Turing is arguing against
3. Articulate why equivalence matters for the rest of his argument

The hint points at the reasoning move, not the answer.
