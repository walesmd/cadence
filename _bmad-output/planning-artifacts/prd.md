---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-cadence-2026-02-24.md'
  - '_bmad-output/brainstorming/brainstorming-session-2026-02-24.md'
  - 'docs/STORAGE-FORMAT.md'
  - 'docs/MCP.md'
briefCount: 1
researchCount: 0
brainstormingCount: 1
projectDocsCount: 2
workflowType: prd
classification:
  projectType: desktop_app
  domain: productivity_performance
  complexity: medium
  projectContext: brownfield
---

# Product Requirements Document - cadence

**Author:** Mike
**Date:** 2026-02-24

## Executive Summary

Cadence is an open-source, cross-platform desktop app that turns lightweight activity capture into evidence-based, role-aligned performance reflection. **Target users:** Individual contributors and knowledge workers who are evaluated on performance (reviews, promos, annual cycles), are willing to capture what they did, and do not want to write the narrative themselves. **Problem:** People must "understand the story and justify their own existence" at work—turning daily activity into performance narratives and reviews—while today they patch together task apps, calendars, and ad hoc tooling with no single guided flow. **Vision:** One place to capture; the system produces the story and justification (weekly, monthly, quarterly, or on demand), aligned to job description and company expectations. Data stays LLM-stable and exportable; an optional MCP layer lets users connect their own LLMs to their performance data. Success means pain-free, career-useful reviews with minimal time on prep, and—over time—company recognition as a past-performance utility (like an ATS for talent).

### What Makes This Special

- **"I capture; the system justifies."** The user captures activity; the system produces the reflection and alignment. No expectation that the user writes the narrative.
- **Spotlight-like input + minimal verify.** Two surfaces: type-and-file input (global hotkey, NLP interpretation) and a minimal recall dashboard. No forms, no time-checking; completion friction minimized.
- **Performance first; context optional.** Easy logging is the entry point; guided context (JD, projects, goals) is optional and improves reviews. A review can always be generated from activity alone; quality improves with context.
- **LLM-stable, exportable, no lock-in.** Predictable structure; full export; future MCP so users can use their own LLMs. User sovereignty: accept or deny suggestions.
- **Positioning.** No other product combines this level of capture ease, optional guided context, aligned reflection, and export/MCP in one open-source desktop app. Companies can adopt it as a utility that tracks talent and advocates for them.

## Project Classification

| Dimension | Value |
|-----------|--------|
| **Project type** | Desktop app (cross-platform: macOS, Windows, Linux) |
| **Domain** | Productivity / performance (individual and talent) |
| **Complexity** | Medium (NLP/interpretation, optional LLM, SQLite + produce-MD, export/MCP) |
| **Project context** | Brownfield (existing repo, Tauri scaffold, storage and MCP design in place) |

## Success Criteria

### User Success

- **Pain-free, career-useful reviews** — Users get high-quality, evidence-based reviews with minimal manual effort. Success = "I didn't have to stress or spend hours writing my review."
- **Minimized time on review prep** — Time spent assembling evidence and drafting narratives drops. Leading indicator: capture stays lightweight (hotkey + verify); review generation is on-demand (or later scheduled) without extra prep.
- **Career enhancement** — Reviews are aligned to role and company format so they support promos, annual cycles, and recognition. Users feel their contributions are accurately reflected and advocated for.
- **"Aha" moment** — First useful review (e.g. "last week") generated from captured activity with minimal manual writing; user sees the full loop working.

### Business Success

- **Individual adoption** — Users install and use Cadence as their primary capture-and-reflection tool; they stop cobbling multiple tools.
- **Company recognition as a utility** — Organizations recognize Cadence as valuable for past-performance and want it in their toolkit (like an ATS for applicants). Cadence tracks talent and advocates for them; companies see it as a utility that supports evidence-based performance and reduces review burden.
- **Ecosystem position** — Over time: adopted as a standard utility for talent/performance (individual first; optional org/team layer later). Open-source; no revenue target for MVP.

### Technical Success

- **Data integrity** — SQLite as single source of truth; activity append-only where needed for audit; export bundle complete and reproducible.
- **LLM-stable output** — Produced markdown (and optional JSON) is predictable, parseable, and portable for humans and LLMs.
- **Cross-platform** — Desktop binaries for macOS (first), then Windows and Linux; single codebase (e.g. Tauri).

### Measurable Outcomes

- **User:** % of users who generate at least one review (on-demand or scheduled) within 30 days; sustained capture frequency (e.g. entries per week); optional context completion (JD, projects) when present.
- **Value:** User-reported reduction in time on review prep; use of generated reviews in real cycles (self-reported or inferred).
- **Adoption/strategic:** Orgs or teams that adopt or recommend Cadence as a performance/talent utility; positioning as "ATS for talent" or "past-performance utility" in conversations and materials.

## Product Scope

### MVP - Minimum Viable Product

- **Spotlight-like capture** — Global hotkey, single-line input; NLP (or simple rules) interprets and stores in SQLite.
- **Minimal recall dashboard** — Read from DB; show "today" (or configurable window); trust/verify (confirm or edit).
- **LLM-stable, exportable storage** — SQLite as source of truth; commands to produce markdown (and optional JSON) for activity; export bundle.
- **On-demand review (single period)** — User selects a period (e.g. "last week"); system generates one review from activity (+ optional context if present); output markdown/JSON; validates full loop.
- **Optional guided context** — Prompts for JD, projects, goals; reviews work without them, better with them.
- **Cross-platform desktop** — Ship for macOS first; Windows and Linux in scope for MVP.

**MVP success gate:** User can capture via hotkey, see entries in the dashboard, and request "review for last week" and get a usable, LLM-stable output. At least one review generated within 30 days; reduced time on review prep (self-reported).

### Growth Features (Post-MVP)

- Calendar integration as baseline; user input overrides.
- Configurable scheduled runs (weekly, monthly, quarterly).
- MCP server so users connect their own LLMs to Cadence data and capabilities.

### Vision (Future)

- Company adoption as a past-performance / talent utility (ATS for talent).
- Team/org views or company-wide deployment; optional shared context and governance.

## User Journeys

### Primary User: Individual Contributor / Knowledge Worker

**Opening** — They are evaluated on performance (reviews, promos, annual cycles). They are willing to capture what they did but do not want to write the narrative. Today they use multiple tools (task app, calendar, markdown, scripts) or a custom setup (e.g. ~/.super-productivity) and want one place to capture and get aligned reflection.

**Rising action** — They discover Cadence (word of mouth, open source, "performance review from my activity"). They install the desktop app (macOS / Windows / Linux). They see an optional guided flow for JD, projects, goals; they can skip and still capture and get reviews. They set a global hotkey and start typing: one line, Enter, done. They occasionally open the minimal dashboard to see "today" and trust/verify the log.

**Climax** — They request "review for last week" and get a usable, LLM-stable output with minimal manual writing. They see the full loop: capture → storage → reflection. They feel relief: "I didn't have to stress or spend hours writing my review."

**Resolution** — Capture and review become routine. They add context over time (JD, projects, goals) and reviews improve. Optionally they connect their own LLMs via MCP. They use Cadence as their primary capture-and-reflection tool and stop cobbling multiple tools.

**Reveals requirements for:** Onboarding (install, optional guided context); capture (global hotkey, single-line input, NLP/store); recall (minimal dashboard, today/window, trust/verify); on-demand review (period selection, generation, markdown/JSON output); export (LLM-stable, bundle).

### Secondary User: Manager / Lead (Post-MVP)

**Opening** — Same need for their own performance: capture and reflection; optional team or shared context later.

**Rising action / Resolution** — Same core journey as primary user; later, team-level views or shared context may apply.

**Reveals requirements for:** Same as primary for MVP; later: team/org views, shared context (vision).

### Journey Requirements Summary

| Capability area | Requirements revealed |
|-----------------|------------------------|
| **Onboarding** | Install (macOS/Windows/Linux), optional guided flow for JD/projects/goals, skip path to capture-only |
| **Capture** | Global hotkey, single-line input, NLP (or simple rules) interpret and store in SQLite |
| **Recall** | Minimal dashboard, read from DB, show "today" or configurable window, trust/verify (confirm or edit) |
| **On-demand review** | Period selection (e.g. last week), generate from activity + optional context, output markdown/JSON |
| **Export** | LLM-stable format, export bundle, reproducible |
| **Future** | MCP connection; team/org views; shared context |

## Innovation & Novel Patterns

### Detected Innovation Areas

- **Reflection-as-product** — Treating "system produces the justification" as the core product, not task logging. Capture is the entry point; reflection aligned to role and company format is the outcome. Novel combination: minimal capture UX + optional context + generated narrative + LLM-stable export.
- **Desktop AI / system automation** — Desktop app (Spotlight-like hotkey, minimal UI) as primary surface; NLP interprets natural-language input; optional LLM for review generation; future MCP so users' own LLMs consume Cadence data. Aligns with "Desktop AI" and "System automation" (scheduled/on-demand reflection).
- **Positioning: ATS for talent** — Past-performance utility in the company toolkit (like an ATS for applicants). Tracks talent and advocates for them; evidence-based performance with reduced review burden. Distinct from generic task or review tools.
- **User sovereignty + optional context** — Reviews always possible from activity alone; better with guided JD/projects/goals. User has final say (accept/deny suggestions). No vendor lock-in; export and optional MCP.

### Market Context & Competitive Landscape

Task and calendar tools focus on logging and scheduling, not role-aligned reflection. Review tools assume the user writes the narrative or use vendor-specific formats. People who want both evidence and alignment build ad hoc setups (~/.super-productivity). No single product combines this capture ease + optional context + aligned reflection + export/MCP in one open-source desktop app.

### Validation Approach

- **MVP:** User can capture via hotkey, see entries in the dashboard, and request "review for last week" and get a usable, LLM-stable output. At least one review within 30 days; self-reported reduction in time on review prep.
- **Adoption:** Individuals use Cadence as primary capture-and-reflection tool; over time, orgs adopt or recommend it as a performance/talent utility.

### Risk Mitigation

- **NLP/LLM dependency:** Start with simple rules or local/small models where possible; optional hints (@time, codes) improve robustness. User can correct in the minimal dashboard.
- **Adoption:** Open-source and "bait" strategy (easy capture first, context later) reduce adoption friction. Export and MCP reduce lock-in concerns.

## Desktop App Specific Requirements

### Project-Type Overview

Cadence is a cross-platform desktop application (Tauri 2) targeting macOS, Windows, and Linux. Primary interactions: Spotlight-like capture (global hotkey), minimal recall dashboard, on-demand review generation. System integration (hotkey, optional tray), local storage (SQLite), and offline-first behavior are central.

### Technical Architecture Considerations

- **Stack:** Tauri 2 + frontend (e.g. Vite/TypeScript). SQLite in app data directory; commands produce markdown/JSON. Optional LLM for review generation (local or API).
- **Data location:** macOS `~/Library/Application Support/cadence/`, Windows `%APPDATA%/cadence/`, Linux `~/.local/share/cadence/` (or configurable). Single `cadence.db`; export bundle for portability.

### Platform Support

- **Cross-platform:** Single codebase; binaries for macOS (first), Windows, and Linux. Tauri handles platform APIs (hotkey, window, system tray if used).
- **macOS:** Primary dev and first ship; global hotkey, menu bar/tray optional.
- **Windows / Linux:** Same feature set; platform-specific hotkey and install paths per Tauri.

### System Integration

- **Global hotkey:** Invoke Spotlight-like input from anywhere (focus-independent). Register via OS (Tauri/plugin or platform API).
- **Optional system tray / menu bar:** Background presence; quick open for dashboard or capture. Not required for MVP.
- **No deep OS integration beyond:** hotkey, window, file system (app data dir), optional tray.

### Update Strategy

- **Auto-update:** Tauri update mechanism or manual "check for updates" plus download/install. Policy (auto vs prompt) TBD; not blocking MVP.
- **Versioning:** Semantic versioning; schema version in DB; migrations additive where possible.

### Offline Capabilities

- **Offline-first:** All capture, storage, and recall work offline. SQLite local; no required network for core loop.
- **Review generation:** MVP may use local LLM or rule-based draft; optional API-based LLM when online. Document behavior when offline (e.g. "Review when online" or cached model).
- **Export:** Export bundle is local; no network required.

### Implementation Considerations

- **Hotkey:** Single instance or coordinated multi-process so hotkey always brings focus to same app instance.
- **Performance:** Fast cold start for capture window (sub-second); dashboard can load on demand. SQLite sufficient for expected activity volume.
- **Skip for this type:** Web SEO, mobile-specific features (per project-type guidance).

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

- **MVP approach:** Problem-solving MVP — smallest set that delivers the core loop: capture → recall/verify → one on-demand review. Success = "I can capture via hotkey, see my log, and get a usable review for a period."
- **Resource assumptions:** Solo or small team; Tauri + SQLite + optional LLM (local or API). No revenue target; open-source adoption and validation first.

### MVP Feature Set (Phase 1)

**Core user journeys supported:** Primary user — install → capture (hotkey) → recall/verify (dashboard) → request "review for last week" → get LLM-stable output. Optional guided context (JD, projects, goals) improves reviews but is not required.

**Must-have capabilities:**

- Global hotkey + Spotlight-like single-line input; parse (NLP or simple rules) → store in SQLite.
- Minimal recall dashboard: read from DB, show "today" or window, trust/verify (confirm or edit).
- SQLite as source of truth; commands to produce markdown (and optional JSON) for activity; export bundle.
- On-demand review for one period (e.g. "last week"); output markdown/JSON; validates full loop.
- Optional guided prompts for JD, projects, goals.
- Cross-platform desktop: macOS first, then Windows and Linux.

**Out of scope for Phase 1:** Calendar integration; scheduled automatic runs; MCP server; team/org views.

### Post-MVP Features

**Phase 2 (Growth):** Calendar as baseline; user input overrides. Configurable scheduled runs (weekly, monthly, quarterly). MCP server so users connect their own LLMs to Cadence data and capabilities.

**Phase 3 (Expansion):** Company adoption as past-performance / talent utility (ATS for talent). Team/org views or company-wide deployment; optional shared context and governance.

### Risk Mitigation Strategy

- **Technical:** NLP/LLM — start with simple rules or local/small models; optional hints; user can correct in dashboard. Single-instance or coordinated process for hotkey.
- **Market:** Open-source and "bait" (easy capture first, context later); export and MCP to reduce lock-in; validate with "one review within 30 days" and self-reported time saved.
- **Resource:** MVP is deliverable by a small team; phases 2 and 3 can follow once MVP is validated.

## Functional Requirements

### Capture

- FR1: User can invoke a global capture input from anywhere (e.g. hotkey) without switching applications.
- FR2: User can enter a single line of natural-language activity (e.g. task, meeting, outcome) and submit it in one action.
- FR3: System can interpret the entered text to derive structured fields (e.g. project, date, time, activity type, outcome) for storage.
- FR4: System can store each capture as a persistent activity entry with raw input and interpreted structure.
- FR5: User can submit capture without being required to specify time; system accepts user's stated or implied time.

### Recall & Verification

- FR6: User can open a recall view that shows captured activity for a chosen time window (e.g. today or configurable range).
- FR7: User can confirm that a displayed activity entry is correct (trust/verify).
- FR8: User can edit an existing activity entry (e.g. correct text or interpreted fields) and persist the change.
- FR9: System can display activity entries in chronological order within the selected window.

### Context Management (Optional)

- FR10: User can add or update a job description (or role context) that the system can use when generating reviews.
- FR11: User can define and maintain a set of projects (or initiatives) that the system can use when generating reviews.
- FR12: User can add or update goals that the system can use when generating reviews.
- FR13: User can skip or defer adding context and still capture activity and request reviews.
- FR14: System can use available context (JD, projects, goals) when generating reviews when the user has provided it.

### Review Generation

- FR15: User can request a performance review for a selected time period (e.g. last week, date range).
- FR16: System can generate a review from stored activity for the requested period.
- FR17: System can incorporate optional context (JD, projects, goals) into the generated review when provided.
- FR18: System can produce the review in a human- and LLM-friendly format (e.g. markdown and optional structured format).
- FR19: User can receive the generated review in-app or as an exportable artifact.
- FR20: System can persist generated reviews so the user can access them later.

### Export & Portability

- FR21: User can export activity for a date range as markdown (and optionally structured format) produced from stored data.
- FR22: User can export context (JD, projects, goals) as markdown (or equivalent) produced from stored data.
- FR23: User can export generated reviews as markdown (and optionally structured format).
- FR24: User can create a full export bundle (e.g. activity, context, reviews, manifest) for portability or backup.
- FR25: Exported output uses a predictable, documented structure suitable for LLMs and other tools.

### Application Lifecycle

- FR26: User can install and run the application on macOS, Windows, and Linux from provided binaries.
- FR27: User can open the main recall/dashboard view from the application.
- FR28: Application can run in a way that allows the global capture shortcut to work when the app is in the background (e.g. single instance or coordinated process).
- FR29: User can configure or use a default location for application data (e.g. app data directory per platform).
- FR30: System can initialize and maintain a single local data store (e.g. one database file) for the user's data.

## Non-Functional Requirements

### Performance

- **Capture invocation:** Capture input (e.g. hotkey) becomes available and responsive within 2 seconds of invocation so the user can type immediately.
- **Recall view:** Recall/dashboard view loads and displays activity for the selected window within 3 seconds under normal data volume (e.g. hundreds of entries).
- **Review generation:** For a typical period (e.g. one week of activity), the system produces a generated review within 60 seconds or provides clear progress/feedback.
- **Export:** Export of activity, context, or full bundle for a given range completes within 30 seconds for typical data volumes.

### Security

- **Data at rest:** User data (activity, context, reviews) is stored under the user's control in the application data directory; access follows OS file/permission model. Encryption at rest is optional and not required for MVP.
- **Data in transit:** If the app communicates with external services (e.g. optional LLM API), it uses TLS. No sensitive data is sent unless the user explicitly uses such a feature.
- **Local-first:** Core workflow (capture, recall, review generation with local or user-configured services) does not require cloud or third-party access; optional features may do so with clear user consent.

### Reliability

- **Data durability:** Once an activity entry or context is saved, it persists across application restarts and is not lost under normal OS and hardware behavior.
- **Single data store:** One local data store (e.g. one database file) is the source of truth; schema versioning and migrations are applied so upgrades do not lose data.
- **Export as recovery:** User can create a full export bundle at any time for backup or recovery; export format is documented and reproducible.

### Accessibility

- **Keyboard and shortcut:** Primary workflows (invoke capture, submit entry, open recall view, request review) are achievable via keyboard and/or global shortcut so the app is usable without mouse-only interaction.
- **Contrast and readability:** UI text and controls meet minimum contrast and sizing so content is readable at default or user-configured system settings (no specific WCAG level required for MVP).

*Scalability omitted: single-user desktop; no multi-tenant or server-side scaling. Integration: calendar/MCP are future; no NFRs for them in this document.*
