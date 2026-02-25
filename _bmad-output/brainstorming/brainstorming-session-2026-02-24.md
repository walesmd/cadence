---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: []
session_topic: 'Open-source productivity tool: task tracking + calendar integration leading to autonomous, job-description-aligned performance reviews (weekly and on-demand); consolidate existing multi-tool practice into one product'
session_goals: '(1) A plan to achieve this vision and start developing. (2) Consolidate existing practice into a single open-source tool.'
selected_approach: 'ai-recommended'
techniques_used: ['First Principles Thinking', 'Mind Mapping', 'Morphological Analysis']
ideas_generated: 25
context_file: ''
session_active: false
workflow_completed: true
---

# Brainstorming Session Results

**Facilitator:** Mike
**Date:** 2026-02-24

## Session Overview

**Topic:** Open-source productivity tool that lets individuals track daily tasks efficiently, connect to calendars to auto-discover tasks, and—over time—autonomously observe daily activities (manual + calendar) to write performance reviews aligned with job description, role, and experience. Supports weekly reviews and on-demand reviews based on user feedback.

**Goals:** (1) A plan to achieve this goal and start actually developing it. (2) Produce the user's current practice (already using multiple tools) into a single open-source tool.

### Context Guidance

_No context file was provided for this session._

### Session Setup

Session parameters confirmed with facilitator. Topic and goals captured above. Ready for technique selection.

## Technique Selection

**Approach:** AI-Recommended Techniques
**Analysis Context:** Open-source productivity tool (task tracking, calendar, autonomous performance reviews) with focus on a plan to achieve and start developing, and consolidating existing multi-tool practice.

**Recommended Techniques:**

- **First Principles Thinking:** Strip assumptions and rebuild from fundamental truths so the product is defined by core value, not by copying current tools. Establishes non-negotiables and a one-sentence product essence.
- **Mind Mapping:** Branch from one central concept into tasks, calendar, observation, reviews, alignment—surfacing connections and gaps so the system is visible and buildable.
- **Morphological Analysis:** Name key parameters (inputs, triggers, alignment, outputs), list options per parameter, combine into concrete v1/v2 configurations for a clear path to start developing.

**AI Rationale:** Goal = strategic planning + implementation path; complexity = high (product + technical + process). Sequence: foundation (what is this?) → structure (what does it look like?) → buildable variants (what do we build first?).

---

## Technique Execution Results

### First Principles Thinking (completed)

**Interactive Focus:** Smallest set of fundamentals; alignment (evidence + format); reflection vs task list; role vs project level; user truth + suggestions; user sovereignty.

**Key Breakthroughs:**

- **[Category 1]**: Time-Series + Aligned Reflection  
  _Concept:_ The product must capture tasks on a time series and, on a recurring or on-demand basis, output a reflection of the user's performance aligned with their role at their company.  
  _Novelty:_ Reflection (not just logging) as the core output; alignment as a first-class requirement.

- **[Category 2]**: Evidence and Format  
  _Concept:_ Alignment means both grounded in evidence (what actually happened) and authored in the way the company expects work to be reflected.  
  _Novelty:_ Dual requirement—truthful + institutionally legible.

- **[Category 3]**: Value Understanding, Not Task Lists  
  _Concept:_ Reflection is an understanding of what's important and what value the user is delivering to the team; efforts must be alignable to specific projects and goals, reframed at both role and project level.  
  _Novelty:_ Project/goal as first-class dimension alongside role.

- **[Category 4]**: User Truth + System Discovery  
  _Concept:_ Efforts are tied to what the user believes to be true about their work, with suggestions and discovery for things they may not have identified as relevant.  
  _Novelty:_ User-authored truth as base; system as augmenter, not definer.

- **[Category 5]**: User Sovereignty  
  _Concept:_ User tells the system what they did; system understands the user's role in this world; system suggests; user accepts or denies based on how they want to reflect themselves.  
  _Novelty:_ Final say on self-reflection always stays with the user.

**User Creative Strengths:** Clear articulation of dual dimensions (role + project), strong instinct for user agency and authenticity.  
**Energy Level:** Focused, reflective; moved from features to principles quickly.

### Mind Mapping (completed)

**Central node:** "I capture; the system justifies"  
**Under central:** User is willing to capture activity; understanding the story and justifying their own existence is the point of the system—the user doesn't want to do that. System takes inputs and produces the justification.

**Main branches:** (1) Capture (user does this) (2) Automated output & reflection (system does this) (3) User context & tailoring

**Capture — expanded:**

- **Ease of entry:** Extremely easy; desktop app with shortcut (e.g. global hotkey); tags/keywords → evolved to **NLP-first**: natural language processed to suss out project, date, time, activity type, outcomes, growth. No strict syntax rules.
- **Time:** No time-checking; whatever user enters is when they spent it. Completion friction (already did it IRL but didn't check off) is the worst—make marking done trivial.
- **Calendar vs manual:** Calendar = baseline; user input on top = source of truth.
- **Custom syntax examples:** e.g. "dTAK Standup on 2/24 @0900 - identifying core architectural decisions"; interpreted and aligned to schedule, team outcomes, growth opportunities, and stored for quarterly/annual runs. **Design choice:** NLP component rather than strictly defined rules; suss out details through natural language.

**Automated output & reflection — expanded:**

- **Focus:** Performance and productivity **first**. Automatically logging what the user has done is the **bait** — that's what gets them in. Then we get them to add other data (job description, projects, goals) because the reviews get better. Always willing to generate a review from activity alone; **much better with additional context** (JD, projects, goals).
- **Triggers:** Configurable weekly (e.g. Monday 4 AM → prior week), monthly (1st at 4 AM → prior month), quarterly (first day of new quarter at 4 AM → prior quarter); plus on-demand anytime. On-demand aggregates all data to date; backfills missing segments if user requests a period not yet run.
- **Output format:** Structured for LLM and desktop/web consumption (machine-usable).
- **Company expectations / alignment:** Guided documentation — prompt users through the docs that matter (JD, competencies, projects, review format) instead of them cobbling tooling. Reference: ~/.super-productivity as current self-built pattern; product guides that flow.

---

### Morphological Analysis (completed)

**Parameters and v1 choices:**

| Parameter | v1 choice | Notes |
|-----------|-----------|--------|
| **Input** | Spotlight-like | Global hotkey → type → system interprets and files. No forms. |
| **Recall/verify** | Minimal dashboard | Pull up view of what's been logged; trust/verify; minimal UI. |
| **Interpretation** | NLP (suss out) | Natural language → project, time, activity, outcome. Optional hints (e.g. @time) accepted but not required. |
| **Context layer** | Guided (optional) | Prompt for JD, projects, goals; use when present. Reviews always possible from activity; better with context. |
| **Review trigger** | Both | Configurable schedule (weekly/monthly/quarterly) + on-demand. On-demand backfills missing segments. |
| **Output** | Both (LLM + app) | Structured for LLM and desktop/web (e.g. markdown + structured/JSON where useful). |
| **Storage** | LLM-stable, exportable | **MUST** be stored in an LLM-stable format (plain text, markdown, predictable structure) and **exportable** (user can take their data out). |

**v1 configuration (first ship):**

- **Capture:** Desktop app with Spotlight-like input (hotkey, type, Enter, filed) + minimal dashboard to recall and trust/verify the day's log. Calendar as baseline; user entry overrides. NLP interprets; no time-checking; completion friction minimized.
- **Storage:** All activity and context in LLM-stable, exportable format (e.g. local markdown/JSON, or export bundle). No lock-in.
- **Context:** Guided prompts for JD, projects, goals (optional); reviews work without them, better with them.
- **Reviews:** Weekly (e.g. Monday 4 AM), monthly (1st 4 AM), quarterly (first of quarter 4 AM) — configurable; plus on-demand with backfill. Output: LLM- and app-friendly (structured).
- **Alignment:** Use JD/projects/goals when provided; guided documentation flow so users add what matters.

**Platform:** Cross-platform and platform-agnostic. Binaries for **macOS, Windows, and Linux**. Prioritize **macOS** first (primary dev environment); support all three so everyone can use the tool.

---

## Idea Organization and Prioritization

**Session achievement:** 25+ ideas across 3 techniques (First Principles, Mind Mapping, Morphological Analysis), with a single v1 configuration locked for first ship.

### Thematic Organization

**Theme 1: Capture and input**  
_Focus: How activity gets in with minimal friction._

- Spotlight-like input (hotkey, type, file); NLP interprets; no time-checking; completion friction minimized.
- Calendar as baseline; user entry overrides (source of truth).
- Minimal dashboard to recall and trust/verify what’s been logged.
- _Pattern:_ Performance/productivity first — logging is the bait.

**Theme 2: Reflection and output**  
_Focus: System produces the justification; user doesn’t._

- “I capture; the system justifies” — user willing to capture; system tells the story.
- Scheduled (weekly/monthly/quarterly, configurable) + on-demand with backfill.
- Output: LLM- and app-friendly (structured); alignment = evidence + company format.
- _Pattern:_ Always generate a review; much better with JD/projects/goals.

**Theme 3: Context and alignment**  
_Focus: Guided documentation instead of cobbled tooling._

- Guided prompts for JD, projects, goals (optional); use when present.
- User sovereignty: accept/deny suggestions; final say on self-reflection.
- Role + project as first-class; efforts tied to user truth + system discovery.
- _Pattern:_ Prompt them to add what matters; don’t require it upfront.

**Theme 4: Storage and portability**  
_Focus: LLM-stable, exportable, no lock-in._

- MUST be LLM-stable format (plain text, markdown, predictable structure).
- Exportable so user can take their data out.
- _Pattern:_ Enables both tooling and future LLM use; builds trust.

**Breakthrough concepts:** (1) “Bait” strategy — logging first, context later. (2) Spotlight-like + minimal verify as the only two capture surfaces. (3) v1 as a single coherent first ship.

### Prioritization Results

- **Top priority:** v1 configuration (first ship) — capture + storage + optional context + scheduled + on-demand reviews.
- **Quick win:** Spotlight-like input + LLM-stable local storage + minimal dashboard (core loop before calendar or full review pipeline).
- **Next tier:** Calendar integration; guided JD/projects/goals onboarding; scheduled review runs.

### Action Planning

**Immediate next steps (this week / next):**

1. **Define storage format** — Choose LLM-stable schema (e.g. markdown per day or JSON activity log) and export shape; document it.
2. **Spike desktop “Spotlight” input** — Global hotkey → single line input → parse (NLP or simple rules first) → append to storage. No dashboard yet.
3. **Minimal recall dashboard** — Read from storage; show “today” (or configurable window); allow trust/verify (confirm or edit). Desktop or web, minimal UI.
4. **On-demand review (single period)** — Given storage + optional JD/projects in same format, generate one review for a chosen period (e.g. “last week”). Output markdown + optional JSON. Validates full loop.

**Resources needed:** Desktop app approach (e.g. Electron, Tauri, or system tray + hotkey) that produces **cross-platform binaries (macOS, Windows, Linux)**; prioritize macOS first. NLP/LLM for parsing and for review generation; local file system or simple DB that exports to LLM-stable format.

**Success indicators:** You can type one line via hotkey, see it in the minimal dashboard, and request “review for last week” and get a usable, LLM-stable output.

---

## Session Summary and Insights

**Key achievements:**

- First principles: time-series + aligned reflection; user sovereignty; evidence + format; role + project; logging as bait.
- Mind map: Capture (Spotlight-like, NLP, minimal verify) → Automated output (scheduled + on-demand) → Context (guided, optional).
- v1 locked: Spotlight-like input, minimal dashboard, LLM-stable exportable storage, optional guided context, both scheduled and on-demand reviews.

**Session reflections:**

- Clear progression from “what is this?” to “what do we build first?” with a shippable v1.
- Strong emphasis on user agency (capture, verify, accept/deny) and on not locking users in (exportable, LLM-stable).
- Reference to existing practice (~/.super-productivity) helped ground “guided documentation” and the value of one consolidated tool.

**Next steps:** Review this document; start with storage format + Spotlight-style input; add minimal dashboard and one on-demand review to close the loop. Then iterate toward calendar and scheduled runs.
