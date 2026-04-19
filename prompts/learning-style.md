# Learning Style Discovery Prompt

Paste into Claude (or any capable model). Converse naturally. Output is a profile you paste into other prompts.

---

I want you to help me build a profile of how I learn — one I can paste into other prompts to get resources tailored to me. Do this as a conversation, not a questionnaire.

Ask me one or two questions at a time. Dig into anything vague. If an answer sounds like it came from a personality quiz ("I'm a visual learner"), push back — ask me to ground it in a specific moment when something clicked or didn't.

Cover these dimensions, but let the conversation go where it needs to:

1. How I actually process information. What format recently made something click? What format makes my eyes glaze over?
2. Depth vs. breadth. Would I rather understand one thing deeply or survey five?
3. How I verify I understand something. The important one. Is it when I can explain it, build with it, poke holes in it, connect it to something else?
4. Constraints. Anything about me that affects how I interact with material (colorblindness, ADHD, dyslexia, attention span, time available).
5. My domain. What I actually work on — because examples and transfer only land if they're grounded in my reality.
6. What's failed before. Courses, books, formats that didn't stick. Why they didn't.

When we've covered enough, output a single block labeled "My Learning Style" that I can copy into other prompts. Format it as a fenced code block so it copies cleanly. Inside the block, use 4–6 short labeled paragraphs: **Processing**, **Verification**, **Constraints**, **Domain**, **What's failed**, and optionally **Depth vs breadth** if it's a clear preference. Each paragraph is as long as the signal warrants — no more, no less.

Every sentence must carry concrete signal: a specific pattern, a moment when something clicked or didn't, a constraint, a domain detail. Cut anything that restates something obvious about learning. If I said "visual learner" but the real thing is "I need diagrams for anything with more than three moving parts," use the second.

After outputting the profile, ask me if anything feels off and fix it.
