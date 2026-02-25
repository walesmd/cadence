---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
lastStep: 14
status: 'complete'
completedAt: '2026-02-24'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/product-brief-cadence-2026-02-24.md'
  - 'docs/STORAGE-FORMAT.md'
  - 'docs/MCP.md'
---

# UX Design Specification cadence

**Author:** Mike
**Date:** 2026-02-24

---

## Executive Summary

### Project Vision

Cadence is an open-source, cross-platform desktop app built on a single UX philosophy: "I capture; the system justifies." Users capture activity with near-zero friction (global hotkey, single-line natural language input, instant dismiss). The system interprets, stores, and — when asked — generates evidence-based, role-aligned performance reviews from that captured activity. Two primary surfaces: a Spotlight-like capture input and a minimal recall dashboard. Optional guided context (job description, projects, goals) improves reviews but is never required. Data stays local, LLM-stable, and exportable.

### Target Users

**Primary:** Individual contributors and knowledge workers who are evaluated on performance (reviews, promos, annual cycles). They are willing to capture what they did but do not want to write the narrative themselves. Tech-savvy enough to use a desktop app with hotkeys. Many currently cobble together multiple tools (task apps, calendars, markdown files, scripts) and want one consolidated place for capture and reflection. Platform: macOS first, then Windows and Linux.

**Secondary (post-MVP):** Managers and leads with the same capture-and-reflection needs; may later benefit from team-level views or shared context.

### Key Design Challenges

- **Capture friction must be near-zero** — The hotkey-to-dismiss cycle is the make-or-break interaction. Any added friction (loading time, required fields, confirmation dialogs) kills adoption. The capture window must appear instantly, accept one line of text, and disappear on Enter.
- **NLP confidence and trust/verify balance** — The system interprets natural language into structured fields (project, time, tags, outcome). Users need a way to see and correct interpretations without being forced to verify every entry. The recall dashboard handles this, but the balance between implicit trust and explicit verification is delicate.
- **Optional context onboarding without blocking** — Job description, projects, and goals make reviews dramatically better, but requiring them upfront creates adoption friction. The UX must make context discoverable and inviting without gating the core capture loop.
- **Review output must feel trustworthy** — Generated reviews are the payoff. The presentation must feel polished, the content must be editable, and users must trust the output enough to use it in real performance cycles.

### Design Opportunities

- **Spotlight-like input as signature interaction** — This can be a best-in-class desktop capture experience: fast, minimal, delightful. A distinctive interaction that defines the product.
- **Progressive disclosure for context** — Start with pure capture; gently surface context prompts as the user builds history. After a first review: "Your reviews could be even better with a job description." Natural, non-blocking, value-driven.
- **Review as the "aha moment"** — The first generated review is the core value demonstration. Making this moment impressive, easy to reach, and clearly better than manual effort is the biggest UX opportunity in the product.

## Core User Experience

### Defining Experience

The core experience of Cadence is **capture**: invoke hotkey, type one line of natural language, press Enter, dismiss. This single interaction — repeated daily, multiple times — is the foundation everything else builds on. It must feel like typing into Spotlight or Alfred: instant appearance, zero chrome, immediate dismissal. The user's mental model is "I just told the system what I did" — not "I logged an entry in a database."

Everything downstream (recall, reviews, exports) exists because the user captured. If capture feels effortless, the product succeeds. If it feels like work, nothing else matters.

### Platform Strategy

- **Platform:** Cross-platform desktop application (macOS primary, Windows and Linux supported)
- **Input model:** Keyboard-first. Global hotkey is the primary invocation; all core flows achievable via keyboard. Mouse available for dashboard interactions but never required for the critical path.
- **Window types:** Two distinct surfaces:
  - **Capture overlay** — Minimal, borderless or near-borderless input field. Appears over current workspace, centered or top-positioned (Spotlight-style). Disappears on Enter or Escape. No navigation, no chrome.
  - **Dashboard window** — Full application window for recall, review generation, context management, settings, and export. Standard desktop app layout with navigation.
- **Offline:** Fully offline for all core functionality (capture, recall, review generation with local/rule-based approach). Network only needed for optional external LLM API calls.
- **System integration:** Global hotkey registration, optional system tray/menu bar presence, platform-appropriate data directories.

### Effortless Interactions

- **Capture:** Hotkey → type → Enter → gone. No window chrome, no fields to fill, no confirmation dialog, no loading state. Sub-second appearance. The interaction should feel like it costs zero cognitive effort.
- **NLP interpretation:** Happens silently after submission. The user types naturally ("finished Q1 report for Project Atlas at 3pm"); the system derives structure (project, time, outcome) without asking. No "parsing preview" or "confirm interpretation" step during capture.
- **Review generation:** Select a period, press one button. No configuration, no template selection, no required fields. Optional context (JD, projects, goals) enriches the output when available but is never gated.
- **Trust by default:** Entries appear in the dashboard as captured. The system assumes they are correct. Verification and editing are available but never prompted or required. The dashboard is a "glance and move on" surface, not a "review and approve" workflow.

### Critical Success Moments

1. **First capture** — The hotkey works, the input appears instantly, they type one line, press Enter, and it vanishes. Reaction: "That was easy." Failure mode: slow appearance, required fields, or confusion about what to type.
2. **First dashboard glance** — They open the dashboard and see their entries organized chronologically with correctly interpreted structure (project tags, times). Reaction: "It understood what I meant." Failure mode: misinterpreted entries, confusing layout, or empty state with no guidance.
3. **First review (the aha moment)** — They request "last week" and receive a coherent, role-aligned narrative built from their captures. Reaction: "This is exactly what I needed — and I didn't have to write it." Failure mode: generic output, missing entries, or unclear how to generate.
4. **First real-world use** — They paste a generated review into an actual performance cycle, review form, or 1:1 prep doc. Reaction: "This saved me hours." Failure mode: output format doesn't fit their company's expectations, or they don't trust it enough to use.

### Experience Principles

1. **Capture is sacred** — Nothing interrupts or slows the capture flow. No loading states, no required fields, no confirmation steps. The capture window is inviolable: it appears, accepts input, and disappears.
2. **Trust first, verify later** — The system trusts the user's natural language input; the user trusts the system's interpretation. Verification is always available in the dashboard but never forced. Corrections are easy but optional.
3. **Value without setup** — Reviews can be generated from activity alone, from day one, with zero context provided. Adding a job description, projects, or goals is a path to *better* reviews, not a prerequisite for *any* review.
4. **The system writes; you approve** — The user never writes prose. The system generates narratives; the user accepts, edits, or regenerates. The product's job is to turn raw activity into aligned reflection — that's the value proposition made tangible in every interaction.

## Desired Emotional Response

### Primary Emotional Goals

- **Relief** — "I don't have to stress about this anymore." The dominant feeling when using Cadence should be relief — relief that capture is easy, relief that the system writes the narrative, relief that review season isn't a crisis.
- **Confidence** — "My work is being tracked and represented accurately." Users should feel confident that their activity is captured, that the system understands what they did, and that generated reviews reflect reality.
- **Effortlessness** — "I barely had to do anything." Every interaction should feel like it cost almost no effort. Capture in particular should feel lighter than a text message.

### Emotional Journey Mapping

| Stage | Desired Emotion | Design Implication |
|-------|----------------|-------------------|
| **Discovery** | Curiosity + Hope — "This might solve my review problem" | Landing page / README communicates the value proposition clearly: "You capture; it writes your review" |
| **First launch** | Welcome + Ease — "This is simple, I can do this" | No overwhelming onboarding. Optional context setup with clear "skip" path. Immediate access to capture. |
| **First capture** | Delight + Speed — "That was effortless" | Sub-second hotkey response. One line, Enter, gone. A tiny moment of "wow, that's it?" |
| **First dashboard glance** | Trust + Surprise — "It understood me" | Entries displayed with correctly interpreted structure. Clean, calm layout. No errors to fix. |
| **First review** | Relief + Pride — "This is actually good, and I didn't write it" | Well-formatted, substantive narrative. Clearly aligned to activity. The "aha moment." |
| **Ongoing use** | Routine + Peace of mind — "This just works" | Invisible in daily life except for the hotkey capture. Reviews are there when needed. |
| **Something goes wrong** | Patience + Control — "I can fix this easily" | Clear error messages. Easy editing in dashboard. Regenerate review with one click. Never lose data. |

### Micro-Emotions

- **Confidence over confusion** — The user always knows what happened (was it saved? what did it interpret?). The dashboard provides certainty.
- **Trust over skepticism** — Generated reviews feel substantive and accurate, not generic or hallucinated. Build trust through transparency (show what activity was used).
- **Accomplishment over frustration** — Every capture is a small win. Every review is a big win. The product reinforces "you're building your case."
- **Calm over anxiety** — Review season should feel manageable, not stressful. Cadence is the antidote to "I have nothing to show for the last quarter."

### Design Implications

- **Capture confirmation:** A subtle, brief visual cue on successful capture (e.g., the input field briefly shows a checkmark or gentle color flash before dismissing). Builds confidence without adding friction.
- **Dashboard tone:** Clean, calm, understated. No bright colors or urgent indicators. Information-dense but not overwhelming. The feeling should be "everything is in order."
- **Review presentation:** Generated reviews should look polished — good typography, clear structure, professional tone. The quality of the output builds trust in the system. Include a subtle indicator of what activity was used ("Based on 23 entries from Feb 17-21").
- **Error states:** Friendly, non-alarming. "Couldn't save — try again" rather than technical error codes. Never lose the user's input on error.
- **Empty states:** Encouraging, not guilt-inducing. "Ready when you are" rather than "You have no entries." Guide without pressuring.

### Emotional Design Principles

1. **Relief is the product** — Every design choice should ask: "Does this reduce the user's stress about performance documentation?"
2. **Invisible when working** — The best emotional state during daily use is "I forgot I was even using it." Capture should be habitual, not effortful.
3. **Celebrate the output, not the input** — Don't celebrate captures (no confetti, no streaks). Celebrate reviews — the generated narrative is the reward.
4. **Never punish absence** — If someone doesn't capture for a week, welcome them back without guilt. No "you missed 5 days" notifications. No streaks. No shame.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**1. Spotlight / Alfred / Raycast — The capture model**
- **What they do well:** Instant invocation via hotkey; single text input; natural language processing; immediate dismiss. This is the exact pattern Cadence's capture window follows.
- **Key UX lessons:** The input field IS the interface. No chrome, no navigation, no loading state. Results appear inline below the input. Raycast proves this works with web technology (Electron/web-based rendering).
- **Transferable patterns:** Pre-created hidden window for instant show; centered top-positioned overlay; single input field with placeholder text; Escape to dismiss; Enter to submit and dismiss; sub-second response.

**2. Notion — The dashboard and content model**
- **What they do well:** Clean, calm information display. Markdown-native content. Inline editing without mode switching. Good information hierarchy without visual noise.
- **Key UX lessons:** Content-first design — the UI disappears and lets the content breathe. Editing is inline and natural, not modal. Professional aesthetic that makes generated content feel valuable.
- **Transferable patterns:** Minimal chrome dashboard; inline editing for activity entries; clean typography for generated reviews; calm neutral color palette; content-focused layout.

**3. Linear — Navigation and keyboard-first UX**
- **What they do well:** Keyboard shortcuts for everything. Fast navigation. Minimal but functional sidebar. Status indicators without clutter. Makes a data-heavy interface feel lightweight and fast.
- **Key UX lessons:** Keyboard-first doesn't mean ugly or inaccessible. Command palette pattern (Cmd+K). Subtle animations that feel responsive without being distracting. Sidebar navigation with clear hierarchy.
- **Transferable patterns:** Keyboard shortcuts throughout dashboard; command palette for power users; compact sidebar navigation; clean data tables/lists; subtle hover and focus states.

### Transferable UX Patterns

**Navigation Patterns:**
- Compact sidebar for dashboard navigation (Dashboard, Reviews, Context, Settings)
- Keyboard shortcuts for all primary navigation (e.g., Cmd+1 for Dashboard, Cmd+2 for Reviews)
- No breadcrumbs or deep nesting — flat navigation hierarchy

**Interaction Patterns:**
- Spotlight-style capture overlay (from Raycast/Alfred)
- Inline editing for activity entries (from Notion)
- One-click review generation with period selector
- Copy-to-clipboard for generated reviews (one click)

**Visual Patterns:**
- Calm, neutral color palette — no bright accent colors for primary UI
- Clean typography hierarchy — clear distinction between headings, body, metadata
- Generous whitespace — content breathes; nothing feels cramped
- Subtle borders and dividers — structure without visual weight

### Anti-Patterns to Avoid

- **Jira-style complexity** — Overwhelming forms, required fields, mandatory workflow states, status transitions. The opposite of Cadence's "trust first" principle.
- **Streak/gamification patterns** — Duolingo-style streaks, badges, or guilt notifications. Directly violates "never punish absence" and "celebrate the output, not the input."
- **Wizard-style forced onboarding** — Multi-step mandatory setup before first use. Violates "value without setup" — users should capture within 30 seconds of first launch.
- **Verbose confirmation dialogs** — "Are you sure you want to save this entry?" adds friction to every interaction. Violates "capture is sacred."
- **Dashboard-as-todo-list** — Presenting unchecked/unverified entries as tasks to complete. The dashboard is for optional verification, not mandatory review.

### Design Inspiration Strategy

**Adopt directly:**
- Spotlight/Raycast: capture overlay interaction model (hotkey → input → dismiss)
- Linear: keyboard-first dashboard navigation with shortcuts
- Notion: calm, content-first aesthetic for reviews and dashboard

**Adapt for Cadence:**
- Raycast's result preview → Cadence shows subtle interpretation chips below input (optional, non-blocking, dismissible)
- Notion's sidebar → simpler with fewer sections (Dashboard, Reviews, Context, Settings)
- Linear's command palette → Cadence's capture window could double as a command surface for power users (post-MVP)

**Explicitly avoid:**
- Any pattern that adds friction to the capture flow
- Any pattern that guilts, shames, or gamifies consistent usage
- Any pattern that requires setup or configuration before delivering value
- Any pattern that treats activity entries as tasks to be "completed" or "approved"

## Design System Foundation

### Design System Choice

**shadcn/ui + Tailwind CSS** — a collection of accessible, copy-paste components built on Radix UI primitives, styled with Tailwind CSS. Components live in the project source (full ownership), not installed as a dependency.

### Rationale for Selection

- **Calm, professional aesthetic** — shadcn/ui's default styling matches the Notion/Linear-inspired vision: clean, neutral, content-first. No opinionated design language to fight (unlike Material Design).
- **Full code ownership** — Components are copied into the project, not imported from a package. Aligns with open source philosophy; no dependency lock-in; every line is modifiable.
- **Accessibility built-in** — Radix UI primitives handle ARIA attributes, keyboard navigation, and focus management correctly. Critical for Cadence's keyboard-first UX.
- **Tailwind-native** — No extra CSS-in-JS runtime. Consistent with the architecture decision to use Tailwind CSS. Single styling approach across custom and library components.
- **Right-sized for Cadence** — The capture window needs almost no components (just a styled input). The dashboard benefits from Input, Button, Dialog, Sidebar, Tabs, Select, Toast, and Skeleton components. We add only what we need.
- **SaaS-portable** — shadcn/ui components transfer directly to a future web product with zero modification.

### Implementation Approach

- Initialize shadcn/ui in the existing Tauri + React scaffold (`npx shadcn-ui@latest init`)
- Start with a minimal component set: Input, Button, Dialog, Sidebar, Tabs, Select, Toast, Skeleton
- Add components incrementally as features require them
- Capture window uses a custom minimal input (not shadcn) for maximum performance and control
- Dashboard uses shadcn components for consistency and accessibility

### Customization Strategy

**Color Palette:**
- Base: Neutral slate/zinc grays — calm, professional, no visual noise
- Accent: One subtle accent color for interactive elements (links, focus rings, active states). Muted blue or teal — not bright, not distracting.
- Semantic: Subtle green for success (capture confirmed), subtle amber for warnings, subtle red for errors. Never loud or alarming.
- Dark mode: Supported from the start; Tailwind's `dark:` variants. Users expect dark mode in a desktop productivity tool.

**Typography:**
- Font: System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', ...`) for native feel and zero load time
- Base size: 14-16px; generous line height (1.5-1.6)
- Hierarchy: Clear distinction between headings (bold, larger), body (regular), and metadata (smaller, muted color)
- Review output: Slightly larger or more generous spacing to feel polished and readable

**Spacing & Layout:**
- Generous whitespace throughout; content breathes
- Consistent spacing scale via Tailwind (4px base unit)
- Dashboard: sidebar (fixed width) + main content area (flexible)
- Capture window: centered input with generous padding; no surrounding UI

**Borders & Radius:**
- Subtle, consistent border radius: `rounded-md` (6px) as default
- Light borders for structure (1px, muted color); no heavy dividers
- Cards/panels: subtle shadow or border, not both

**Motion & Animation:**
- Minimal and purposeful; no decorative animation
- Capture window: fast fade-in on show (~100ms); instant dismiss on Enter
- Dashboard transitions: subtle fade or slide for view changes (~150ms)
- Loading: skeleton placeholders (no spinners)
- Capture confirmation: brief checkmark flash or subtle color shift before dismiss (~200ms)

**Component Tokens (Design Tokens):**
These will be defined in Tailwind config and shadcn theme:
- `--background`, `--foreground` — base surface and text
- `--muted`, `--muted-foreground` — secondary surfaces and metadata text
- `--accent`, `--accent-foreground` — interactive elements
- `--destructive` — error/delete actions
- `--border`, `--ring` — borders and focus rings
- `--radius` — default border radius

## Defining Core Experience

### Defining Experience

**In one sentence:** "Press a hotkey, type what you did, press Enter — and the system turns it into your performance review."

This is the Cadence equivalent of Tinder's swipe or Instagram's filter. It's what users will tell their friends. The entire product exists to make this sentence true.

### User Mental Model

**Current mental model (without Cadence):** "I track stuff in various places (task app, calendar, markdown, scripts), and when review time comes, I do the hard work of digging through everything and writing the narrative myself."

**New mental model (with Cadence):** "I just tell the system what I did. When I need a review, it's already there." The user's job shrinks to one action (capture); the system handles everything else (interpret, organize, generate).

**Key mental model shifts:**
- From "I log entries in a tool" → "I tell the system what I did" (conversational, not transactional)
- From "I assemble evidence for my review" → "The evidence assembles itself" (automatic)
- From "I write my performance narrative" → "The system writes it; I approve" (delegation)

**Where users might get confused:**
- "What should I type?" → Placeholder text guides: `"What did you work on? e.g., Finished Q1 report for Project Atlas"`
- "Did it save?" → Brief confirmation cue (checkmark flash) before dismiss
- "How do I get a review?" → Dashboard has a clear, prominent "Generate Review" button with period selector
- "Is this accurate?" → Generated reviews show source attribution ("Based on 23 entries from Feb 17-21")

### Success Criteria

1. **Speed:** Hotkey to ready-to-type in <500ms (perceived). Dismiss on Enter is instant. The entire capture interaction takes under 5 seconds.
2. **Zero learning curve:** Users type naturally on first use. No instructions needed beyond the placeholder text. No tutorial, no tooltip, no walkthrough.
3. **Silent intelligence:** NLP interprets correctly >80% of the time without user intervention. Misinterpretations are easy to fix in the dashboard but never surface during capture.
4. **Low data threshold:** A user who captures 5 entries can generate a meaningful review. The bar for "enough data" is deliberately low to deliver the aha moment quickly.
5. **Copy-paste ready:** Generated reviews can be pasted directly into a review form, 1:1 doc, or email without reformatting. The output is immediately usable.

### Novel UX Patterns

**Established patterns used (familiar to users):**
- Spotlight/command palette for invocation — proven by macOS Spotlight, Alfred, Raycast, Linear
- Single-line text input — universally understood
- Dashboard with chronological list — standard data display
- Markdown output — widely adopted format

**Novel combination (what makes Cadence different):**
The *combination* is novel: Spotlight-style capture → automatic NLP interpretation → role-aligned review generation. No existing product connects these three steps in a single product. The user doesn't need to learn a new interaction — they already know how to type into a search-style input. The novelty is what the system *does* with that input.

**Teaching approach:** None needed for the core interaction. The interaction pattern is familiar (type and press Enter). The value is surprising (a full review appears from your captures). Progressive disclosure handles everything beyond the core loop.

### Experience Mechanics

**1. Initiation:**
- User presses global hotkey (e.g., `Cmd+Shift+Space` or configurable)
- Capture overlay appears centered, top-third of screen, over current workspace
- Input field is immediately focused with placeholder: `"What did you work on?"`
- No transition delay; window is pre-created and hidden, shown instantly on hotkey

**2. Interaction:**
- User types one line of natural language: `"Led standup, discussed sprint priorities with team"`
- No autocomplete, no suggestions, no dropdowns during typing (MVP)
- The input accepts any text; there is no wrong format
- Optional future enhancement: subtle interpretation chips below input showing parsed project/time

**3. Feedback:**
- On Enter: brief confirmation cue — subtle checkmark flash or green border pulse (~200ms)
- Window dismisses automatically after confirmation cue completes
- On Escape: window dismisses immediately without saving (no confirmation dialog)
- On error: input field shows brief inline error message; typed text is preserved; user can retry or dismiss

**4. Completion:**
- The entry is saved. The user is returned to their previous app/context.
- No notification, no redirect to dashboard, no "view your entry" prompt
- The dashboard shows the new entry next time it's opened (auto-refreshed via TanStack Query)
- The capture is *done*. Mental model: "I told the system. It's handled."
- The entire cycle — hotkey to back-in-context — takes under 5 seconds

## Visual Design Foundation

### Color System

**Base Palette (Light Mode):**
- Background: `#FFFFFF` (pure white main surface)
- Surface: `#F8FAFC` (slate-50, secondary panels/sidebar)
- Border: `#E2E8F0` (slate-200, subtle structural borders)
- Text primary: `#0F172A` (slate-900, main content)
- Text secondary: `#64748B` (slate-500, metadata, timestamps, labels)
- Text muted: `#94A3B8` (slate-400, placeholders, disabled)

**Base Palette (Dark Mode):**
- Background: `#0F172A` (slate-900)
- Surface: `#1E293B` (slate-800)
- Border: `#334155` (slate-700)
- Text primary: `#F1F5F9` (slate-100)
- Text secondary: `#94A3B8` (slate-400)
- Text muted: `#64748B` (slate-500)

**Accent:** `#0EA5E9` (sky-500) — muted blue for focus rings, active nav items, links. Not loud; just enough to indicate interactivity. Dark mode: `#38BDF8` (sky-400).

**Semantic Colors:**
- Success: `#10B981` (emerald-500) — capture confirmation flash
- Warning: `#F59E0B` (amber-500) — NLP low-confidence indicators
- Error: `#EF4444` (red-500) — save failures, validation errors
- All semantic colors used sparingly and subtly; never as large fills

**Contrast:** All text/background combinations meet WCAG AA (4.5:1 for body text, 3:1 for large text). Verified by using slate scale which naturally provides sufficient contrast.

### Typography System

**Font Stack:** System fonts for native feel and zero load time
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
```

**Type Scale:**

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 | 24px / 1.5rem | 600 (semibold) | 1.3 | Page titles (Dashboard, Reviews) |
| H2 | 20px / 1.25rem | 600 | 1.35 | Section headers |
| H3 | 16px / 1rem | 600 | 1.4 | Card titles, subsections |
| Body | 14px / 0.875rem | 400 (regular) | 1.6 | Primary content, entry text |
| Small | 12px / 0.75rem | 400 | 1.5 | Metadata, timestamps, labels |
| Mono | 13px / 0.8125rem | 400 | 1.5 | Code snippets, exported markdown preview |

**Capture window input:** 18px, regular weight, generous padding. Slightly larger than dashboard body text to feel inviting and prominent.

**Review output:** 15px body with 1.7 line height — slightly more generous than dashboard to feel polished and readable when reviewing generated content.

### Spacing & Layout Foundation

**Spacing Scale (4px base):**
- `xs`: 4px — tight internal padding
- `sm`: 8px — compact element spacing
- `md`: 16px — standard element spacing
- `lg`: 24px — section spacing
- `xl`: 32px — major section spacing
- `2xl`: 48px — page-level spacing

**Dashboard Layout:**
- Sidebar: 240px fixed width, collapsible to 48px (icon-only)
- Main content: flexible, max-width 960px centered, with `xl` padding
- Cards/panels: `md` internal padding, `lg` gap between cards

**Capture Window Layout:**
- Centered horizontally, positioned at ~20% from top of screen
- Width: 560px (slightly narrower than Spotlight's 680px for focused feel)
- Input field: full width within window, `lg` vertical padding, `md` horizontal padding
- No surrounding UI, no window chrome (borderless or minimal title bar)

### Two-Surface Design Philosophy

The visual design follows two fundamentally different philosophies for Cadence's two surfaces:

**Capture Overlay — Seamless and Non-Intrusive:**
The capture window must be completely invisible to the user's workflow. It appears, accepts input, and vanishes without disrupting context. Design implications:
- Zero visual weight: no borders, no shadows, no chrome beyond the input field itself
- Semi-transparent or frosted background that lets the user's workspace show through — the capture window feels like a momentary overlay, not an app switch
- No data display, no status indicators, no counts, no history. The capture surface shows nothing except the input field and placeholder text.
- The confirmation cue (checkmark/color flash) is the only feedback, and it's brief (~200ms) and subtle
- The user should barely register that they used an app. The capture window is a whisper, not a conversation.

**Dashboard — Rich, Data-Forward, and Editable:**
The dashboard is the opposite: when users choose to open it, they want to see everything. Design implications:
- **Information density:** Show interpreted fields (project, time, tags, outcome) inline with each entry. Don't hide data behind hover states or expandable rows — surface it directly.
- **Edit-first bias:** Every piece of data on the dashboard should be directly editable. Click a project tag to change it. Click a time to adjust it. Click the entry text to reword it. Inline editing everywhere — no "edit mode" toggle, no modal editors, no separate edit screen.
- **NLP interpretation visible:** Show what the system parsed (project, time, tags) as editable chips or fields alongside each entry. If the system got something wrong, fixing it is one click — not a multi-step correction flow.
- **Batch operations:** Allow selecting multiple entries for bulk actions (re-tag, delete, change project). Power users who review a week of captures should be able to correct multiple items efficiently.
- **Contextual actions on hover:** Edit, delete, duplicate, and other actions appear on row hover. No need to navigate to a detail view for common operations.
- **Generous data display:** Show today's entries by default, with easy date range navigation. Show entry count, project distribution, and time breakdown at a glance. The dashboard should make users feel informed and in control.

This two-surface philosophy means the capture window and dashboard share almost no visual components. The capture window is purpose-built for speed and invisibility. The dashboard is purpose-built for comprehension and manipulation.

### Accessibility Considerations

- **Color:** All text meets WCAG AA contrast ratios. Never rely on color alone to convey meaning (always pair with icons or text labels).
- **Keyboard:** All interactive elements focusable via Tab. Focus rings use accent color (`sky-500`) with 2px ring offset. Radix UI primitives handle focus management automatically.
- **Motion:** All animations respect `prefers-reduced-motion`. When reduced motion is preferred, transitions are instant (0ms) instead of animated.
- **Font sizing:** Respects system font size preferences. Base size in `rem` units scales with user settings.
- **Inline editing:** All editable elements have clear focus states and keyboard support. Enter to confirm, Escape to cancel. Editable fields are visually distinct from static text (subtle underline or background change on focus).

## Design Direction Decision

### Design Directions Explored

Given Cadence's two-surface architecture (capture overlay + dashboard) and the established visual foundation (slate palette, system fonts, shadcn/ui), the design direction is strongly constrained by previous decisions. The core direction is:

**"Invisible Capture, Rich Dashboard"** — a single cohesive direction that treats the two surfaces as fundamentally different design problems unified by a shared color palette and typography system.

### Chosen Direction

**Minimal Productivity** — inspired by Linear and Notion, with Spotlight/Raycast as the capture model.

- **Capture overlay:** Frosted/semi-transparent background, single centered input, no chrome. Invisible to workflow.
- **Dashboard:** Clean sidebar navigation, content-first main area, generous whitespace, inline editing everywhere, data-forward display with editable interpretation chips.
- **Reviews:** Polished typographic presentation with clear structure. Professional enough to paste directly into a review form.

### Design Rationale

- Matches the "relief is the product" emotional goal — calm, professional, unstressed
- Aligns with keyboard-first interaction model — focus states and keyboard navigation are first-class
- Supports the two-surface philosophy — capture is a whisper, dashboard is a conversation
- shadcn/ui's default aesthetic already delivers this direction with minimal customization
- Proven by Linear and Notion to work for productivity tools used by knowledge workers

### Implementation Approach

- Use shadcn/ui defaults as the starting point; customize only color tokens and spacing
- Capture window is a separate, purpose-built component (not using shadcn)
- Dashboard uses full shadcn component library with Cadence's custom theme tokens
- Dark mode from day one — toggle in settings, respects system preference

## User Journey Flows

### Journey 1: First-Time Capture

```
Install app → App launches (dashboard) → Brief welcome ("Press Cmd+Shift+Space to capture")
→ User presses hotkey → Capture overlay appears → User types entry → Enter
→ Confirmation flash → Overlay dismisses → Entry appears in dashboard
```

**Entry point:** Global hotkey (configured during install or first launch)
**Decision points:** None — the flow is linear and frictionless
**Success state:** Entry saved and visible in dashboard
**Error recovery:** If save fails, overlay shows inline error; text preserved; user retries or dismisses

### Journey 2: Dashboard Review & Edit

```
User opens dashboard (click tray icon or hotkey) → Sees today's entries
→ Scans entries chronologically → Notices misinterpreted project tag
→ Clicks project chip → Inline dropdown appears → Selects correct project → Auto-saves
→ Optionally adjusts time, edits text, or deletes entry → All inline, no modals
→ Closes dashboard or leaves it open
```

**Entry point:** System tray icon, dock icon, or dedicated hotkey
**Decision points:** Which entries to review/edit (optional — no entry requires review)
**Success state:** Entries are accurate and correctly tagged
**Error recovery:** Undo for edits (Cmd+Z); deleted entries recoverable within session

### Journey 3: Generate Review

```
User opens dashboard → Navigates to Reviews section → Clicks "Generate Review"
→ Period selector appears (preset: "Last Week", or custom date range)
→ Selects period → Clicks "Generate" → Progress indicator shows
→ Review appears in-app (markdown rendered) → User reads, edits if needed
→ Clicks "Copy to Clipboard" or "Export as Markdown" → Done
```

**Entry point:** Reviews section in dashboard sidebar
**Decision points:** Period selection (preset or custom range)
**Success state:** Review generated, read, and copied/exported
**Error recovery:** "Regenerate" button; edit inline; try different period

### Journey 4: Add Context (Optional)

```
User opens dashboard → Navigates to Context section (or sees gentle prompt after first review)
→ Sees three optional sections: Job Description, Projects, Goals
→ Clicks into any section → Markdown editor appears → Types or pastes content → Auto-saves
→ Returns to dashboard → Next review generation uses this context
```

**Entry point:** Context section in sidebar, or progressive disclosure prompt after first review
**Decision points:** Which context to add (all optional); when to add it (anytime)
**Success state:** Context saved; future reviews are enriched
**Error recovery:** Edit/delete context anytime; reviews always work without context

### Journey Patterns

**Navigation pattern:** Sidebar click or keyboard shortcut → view loads in main content area. No deep nesting. Maximum 1 level of navigation depth.

**Edit pattern:** Click any editable element → inline editor appears → Enter to save, Escape to cancel. No "edit mode" toggle. No modal editors. Auto-save on blur.

**Feedback pattern:** Success = brief subtle confirmation (color flash or toast). Error = inline message near the action. Progress = inline indicator for long operations (review generation). Never block the UI.

### Flow Optimization Principles

- **Minimum clicks to value:** Capture = 0 clicks (hotkey + type + Enter). Review = 3 clicks (navigate + select period + generate).
- **No dead ends:** Every screen has a clear primary action and a path back.
- **Progressive disclosure:** Context, settings, and export are available but never pushed. The happy path is capture → dashboard → review.

## Component Strategy

### Design System Components (from shadcn/ui)

**Used directly:**
- `Input` — dashboard search, context text fields
- `Button` — primary actions (Generate Review, Export), secondary actions (Copy, Cancel)
- `Dialog` — confirmation for destructive actions only (delete entry, delete context)
- `Sidebar` — dashboard navigation
- `Tabs` — switching between context sections (JD, Projects, Goals)
- `Select` — period selector for review generation, project dropdown for inline editing
- `Toast` — success/error notifications
- `Skeleton` — loading states for dashboard and review content
- `Tooltip` — keyboard shortcut hints on hover

**Not needed for MVP:**
- Table (entries are a custom list, not tabular)
- Accordion, Carousel, Sheet, Drawer — no use case

### Custom Components

**CaptureOverlay** (purpose-built, not shadcn)
- Borderless window with frosted/semi-transparent background
- Single input field (18px, full-width, placeholder text)
- Confirmation flash animation on submit
- No other UI elements. No navigation, no buttons, no status.
- States: hidden (default), visible (hotkey pressed), confirming (brief flash after Enter), error (inline message)

**ActivityEntry** (custom, dashboard-specific)
- Displays: raw text, interpreted project chip (editable), time chip (editable), tags (editable)
- Inline editing on click for any field
- Hover actions: edit, delete, duplicate
- States: default, hover (shows actions), editing (inline editors active), saving

**ReviewDisplay** (custom, review-specific)
- Rendered markdown with polished typography
- Source attribution line ("Based on N entries from [date range]")
- Action bar: Copy to Clipboard, Export as Markdown, Regenerate, Edit
- States: empty (prompt to generate), loading (skeleton + progress), display (rendered review), editing (markdown editor)

**ContextEditor** (custom, context-specific)
- Markdown textarea with preview toggle
- Auto-save on blur (debounced)
- Placeholder text per section ("Paste or type your job description here...")
- States: empty (with guidance text), editing, saved (subtle confirmation)

### Component Implementation Strategy

- shadcn components initialized via CLI and customized with Cadence theme tokens
- Custom components built with Tailwind + Radix primitives where accessibility matters (e.g., editable chips use Radix Popover)
- All components support keyboard navigation and focus management
- All components support dark mode via Tailwind `dark:` variants

## UX Consistency Patterns

### Button Hierarchy

- **Primary:** Filled accent color. One per view maximum. Used for the main action (Generate Review, Save, Export).
- **Secondary:** Outlined or ghost. Supporting actions (Cancel, Copy, Back).
- **Destructive:** Red text or outline. Only for irreversible actions (Delete entry). Always requires confirmation dialog.
- **Icon-only:** Used for inline actions (edit, delete on hover). Tooltip shows label.

### Feedback Patterns

- **Success:** Brief toast (bottom-right, auto-dismiss 3s) or inline confirmation. Never modal.
- **Error:** Inline message near the failed action. Red text, not a banner. Retain user input on error.
- **Progress:** Inline progress indicator for operations >1s (review generation). Never a blocking modal spinner.
- **Info:** Subtle inline text or tooltip. Never interruptive.

### Form & Editing Patterns

- **Inline editing (dashboard):** Click to edit. Enter to save. Escape to cancel. Auto-save on blur. No explicit "Save" button for individual field edits.
- **Markdown editing (context):** Textarea with auto-save (debounced 1s after last keystroke). Optional preview toggle.
- **Validation:** Minimal for MVP. Activity entries accept any text. Context fields accept any markdown. Review period must have valid date range.

### Navigation Patterns

- **Sidebar:** Always visible on desktop. Collapsible to icon-only. Sections: Dashboard, Reviews, Context, Settings.
- **Keyboard shortcuts:** Cmd+1/2/3/4 for sidebar sections. Cmd+Shift+Space for capture. Cmd+N for new capture from dashboard.
- **Back navigation:** Not needed — flat hierarchy. Sidebar is always the navigation anchor.

### Empty State Patterns

- **No entries:** "Ready when you are. Press [hotkey] to capture your first activity." Encouraging, not guilt-inducing.
- **No reviews:** "Generate your first review to see the magic. You need at least a few captured entries." Clear guidance.
- **No context:** "Reviews work without context. Add your job description to make them even better." Value-driven nudge, not a requirement.

### Loading State Patterns

- **Dashboard:** Skeleton placeholders matching entry layout. Appear instantly, replaced when data loads.
- **Review generation:** Skeleton + "Generating your review..." with subtle progress animation. Tauri events update progress.
- **Capture:** No loading state. Ever. Fire-and-forget.

## Responsive Design & Accessibility

### Responsive Strategy

Cadence is a **desktop application** — not a web app or mobile app. Responsive design is scoped to:

- **Window resizing:** Dashboard adapts gracefully when the user resizes the window
- **Minimum window size:** 800x600px. Below this, sidebar collapses to icon-only automatically.
- **Sidebar behavior:** At window widths <1024px, sidebar collapses to icon-only by default. User can expand manually.
- **Content reflow:** Main content area uses max-width (960px) with flexible padding. Narrower windows reduce padding; content remains readable.

**Not applicable:** Mobile breakpoints, tablet layouts, touch-first design. Cadence is desktop-only for MVP. Future SaaS web version will need its own responsive strategy.

### Window Size Adaptation

| Window Width | Sidebar | Content Area | Behavior |
|-------------|---------|-------------|----------|
| ≥1280px | Expanded (240px) | Centered, max-width 960px | Full experience |
| 1024-1279px | Expanded (240px) | Flexible, fills available space | Comfortable |
| 800-1023px | Collapsed (48px icon-only) | Fills available space | Compact but usable |
| <800px | Hidden | Full width | Minimum viable (not optimized) |

### Accessibility Strategy

**Target:** WCAG AA compliance for all interactive elements. This is appropriate for a productivity desktop app and ensures keyboard-first users (Cadence's primary audience) have an excellent experience.

**Color & Contrast:**
- All text meets 4.5:1 contrast ratio against its background (WCAG AA)
- Focus rings are clearly visible (2px accent color ring with offset)
- Semantic colors (success, warning, error) never used as the only indicator — always paired with icons or text
- Dark mode maintains equivalent contrast ratios

**Keyboard Navigation:**
- All interactive elements reachable via Tab
- Logical tab order follows visual layout (top-to-bottom, left-to-right)
- Focus trapped within modals/dialogs when open
- Escape closes overlays and cancels inline edits
- Global hotkey works regardless of focus state (OS-level registration)
- Keyboard shortcuts documented in Settings and available via tooltip on hover

**Screen Reader Support:**
- Semantic HTML structure (nav, main, section, article)
- ARIA labels on all interactive elements without visible text labels (icon buttons, chips)
- Live regions for dynamic content updates (new entries, review generation progress)
- Landmark roles for major page sections (sidebar navigation, main content, settings)

**Motion & Animation:**
- All animations respect `prefers-reduced-motion` media query
- When reduced motion preferred: all transitions instant (0ms), no confirmation flash animation
- No animation is required to understand the UI — all animations are decorative/feedback only

### Testing Strategy

- **Keyboard-only testing:** Navigate entire app without mouse. Verify all actions achievable.
- **Screen reader testing:** VoiceOver (macOS primary), NVDA (Windows). Verify all content announced correctly.
- **Contrast testing:** Automated via axe-core or similar in CI. Manual spot-check for custom components.
- **Focus management:** Verify focus moves logically after actions (submit capture, generate review, delete entry).
