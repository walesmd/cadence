---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - '_bmad-output/brainstorming/brainstorming-session-2026-02-24.md'
  - 'docs/STORAGE-FORMAT.md'
  - 'docs/MCP.md'
date: 2026-02-24
author: Mike
---

# Product Brief: Cadence

## Executive Summary

Cadence is an open-source, cross-platform desktop app that turns lightweight activity capture into evidence-based, role-aligned performance reflection. Users capture what they did (tasks, calendar, effort) with minimal friction; the system produces the story and justification—weekly, monthly, quarterly, or on demand—aligned to their job description and company expectations. Capture is the entry point; reflection is the outcome. Data stays LLM-stable and exportable, with an optional MCP layer so users can connect their own LLMs to their performance data.

---

## Core Vision

### Problem Statement

Individuals are expected to "understand the story and justify their own existence" at work—to turn daily activity into performance narratives, reviews, and evidence aligned to their role and company format. Most people are willing to capture what they did; they do not want to write that narrative themselves. Today they cobble together multiple tools (task apps, calendars, markdown, scripts, ~/.super-productivity-style setups) with no single guided flow. Completion friction (e.g., having done something in the real world but forgetting to check it off) adds annoyance. There is no one place that combines easy capture, optional context (job description, projects, goals), and automated, aligned reflection.

### Problem Impact

Without a unified approach, people spend time manually assembling evidence, guessing what to emphasize, and maintaining ad hoc tooling. Reviews are inconsistent, under-evidenced, or misaligned with how the company expects work to be reflected. Valuable activity is lost or under-reported. The burden of "justifying their existence" falls entirely on the individual instead of being assisted by the system.

### Why Existing Solutions Fall Short

Task and calendar tools focus on logging and scheduling, not on producing role- and company-aligned reflection. Review and performance tools often assume the user will write the narrative or use vendor-specific formats. People who want both evidence and alignment end up building their own process (multiple apps, markdown, prompts, scripts)—effective for them but not reusable or guided. No product combines: (1) extremely low-friction capture, (2) optional guided context (JD, projects, goals), (3) scheduled and on-demand reflection output, and (4) LLM-stable, exportable data with a path to use their own LLMs (e.g., via MCP).

### Proposed Solution

Cadence consolidates capture and reflection into one open-source product. **Capture:** Spotlight-like input (global hotkey, type naturally, Enter)—NLP interprets project, time, activity, outcome; calendar provides baseline; user input is source of truth. A minimal dashboard lets users recall and trust/verify what they logged. **Reflection:** Configurable scheduled runs (weekly, monthly, quarterly) plus on-demand reviews that aggregate data and backfill missing segments. Output is structured for LLMs and desktop/web (markdown + optional JSON). **Context:** Guided prompts for job description, projects, and goals—optional; reviews work from activity alone but are much better with context. **Storage:** SQLite as system source of truth; commands produce markdown (and JSON) for humans and LLMs; full export bundle; future MCP server for total performance management. User sovereignty is preserved: the user reports what they did; the system suggests; the user accepts or denies.

### Key Differentiators

- **"I capture; the system justifies"** — User captures activity; the system produces the reflection and alignment. No expectation that the user writes the narrative.
- **Performance and productivity first** — Easy logging is the bait; guided context (JD, projects, goals) is optional and improves reviews. Always able to generate a review; better with context.
- **Spotlight-like input + minimal verify** — Two surfaces only: type-and-file input and a minimal recall dashboard. No forms, no time-checking; completion friction minimized.
- **LLM-stable, exportable, no lock-in** — Data in predictable structure; user can export everything; MCP layer (future) lets them connect their own LLMs to their performance data.
- **Guided documentation instead of cobbled tooling** — Prompts users through the docs that matter (JD, projects, goals, review format) instead of each person inventing their own stack.
- **Cross-platform** — Binaries for macOS, Windows, and Linux (macOS prioritized first).

---

## Target Users

### Primary Users

**Individual contributors / knowledge workers** who are evaluated on performance (reviews, promos, annual cycles) and are willing to capture activity but do not want to manually write "their story" or justify their existence. They may already use multiple tools (task app, calendar, markdown, scripts). They want one place to capture, optional context (JD, projects, goals), and automated, aligned reflection. Archetype: someone already doing something like this with a custom setup (e.g. ~/.super-productivity) who wants it consolidated into a single open-source tool.

### Secondary Users

**Managers / leads** (optional): same capture-and-reflection need for their own performance; may care later about team-level views or shared context. Not required for v1.

### User Journey

- **Discovery:** Word of mouth, open source, "performance review from my activity" / productivity communities.
- **Onboarding:** Install desktop app (macOS / Windows / Linux); optional guided flow for JD, projects, goals; can skip and still capture and get reviews.
- **Core usage:** Global hotkey → type → Enter; occasionally open minimal dashboard to verify the log; optional on-demand or scheduled reviews.
- **Success moment:** First useful review (e.g. "last week") generated from captured activity with minimal manual writing.
- **Long-term:** Capture and review become routine; they add context over time and reviews improve; optionally connect their own LLMs via MCP.

---

## Success Metrics

### User Success

- **Pain-free, career-enhancing reviews** — Users get high-quality, evidence-based reviews with minimal manual effort. Success = "I didn’t have to stress or spend hours writing my review."
- **Minimized time on review prep** — Time spent on assembling evidence and drafting narratives drops sharply. Leading indicator: capture remains lightweight (hotkey, verify); review generation is on-demand or scheduled without extra prep.
- **Career enhancement** — Reviews are aligned to role and company format so they support promos, annual cycles, and recognition. Outcome: users feel their contributions are accurately reflected and advocated for.

### Business Objectives / Strategic Success

- **Individual adoption** — Users install and use Cadence as their primary capture-and-reflection tool; they stop cobbling multiple tools.
- **Company recognition as a utility** — Organizations recognize Cadence as valuable from a **past-performance** perspective and want it as part of their toolkit—similar to how an **ATS (Applicant Tracking System)** is a standard utility for tracking applicants. Cadence **tracks Talent and advocates for them**; companies see it as a utility that supports evidence-based performance and reduces review burden.
- **Ecosystem position** — Over time: adopted as a standard utility for talent/performance (individual first; optional org/team layer later).

### Key Performance Indicators

- **User:** % of users who generate at least one review (on-demand or scheduled) within 30 days; sustained capture frequency (e.g. entries per week); optional context completion (JD, projects) when present.
- **Value:** User-reported reduction in time spent on review prep; use of generated reviews in real cycles (self-reported or inferred).
- **Adoption / strategic:** Number of organizations or teams that adopt or recommend Cadence as a performance/talent utility; positioning as "ATS for talent" or "past-performance utility" in conversations and positioning.

---

## MVP Scope

### Core Features

- **Spotlight-like capture** — Global hotkey, single-line input; NLP (or simple rules) interprets and stores in SQLite.
- **Minimal recall dashboard** — Read from DB; show "today" (or configurable window); trust/verify (confirm or edit).
- **LLM-stable, exportable storage** — SQLite as source of truth; commands to produce markdown (and optional JSON) for activity; export bundle.
- **On-demand review (single period)** — User selects a period (e.g. "last week"); system generates one review from activity (+ optional context if present); output markdown/JSON; validates the full loop.
- **Optional guided context** — Prompts for JD, projects, goals; reviews work without them, better with them.
- **Cross-platform desktop** — Ship for macOS first; Windows and Linux in scope for MVP.

### Out of Scope for MVP

- Calendar integration (v1.1).
- Scheduled automatic runs (weekly/monthly/quarterly) — v1.1.
- MCP server (post-MVP).
- Team/org views or company-wide deployment (future).

### MVP Success Criteria

- User can capture via hotkey, see entries in the dashboard, and request "review for last week" and get a usable, LLM-stable output.
- Success metrics: at least one review generated within 30 days; reduced time on review prep (self-reported).

### Future Vision

- Calendar as baseline; configurable scheduled reviews; MCP so users connect their own LLMs; company adoption as a past-performance / talent utility (ATS for talent).
