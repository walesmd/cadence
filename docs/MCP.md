# Cadence MCP layer

Cadence is a **total performance management system**. The MCP (Model Context Protocol) layer lets you **connect your own LLMs** to your Cadence data so you can ask questions, run analyses, and derive results from your performance — using your choice of model and client.

## Goal

- **Your data** — Activity, context (JD, projects, goals), and reviews live in Cadence (SQLite + produce-MD).
- **Your LLMs** — Any MCP client (e.g. Cursor, Claude Code, custom) can connect to a Cadence MCP server and read/resources and call tools.
- **Ask and derive** — “What did I do last week?”, “Summarize my quarter”, “How does this align to my job description?”, “Generate a review for [period]”, “Compare my focus across projects.”

No vendor lock-in: the app and the MCP server are the same data; you choose which models and UIs to use on top.

---

## Intended MCP surface

### Resources (read-only URIs)

The server exposes Cadence data as **resources** that clients can fetch by URI. All content is LLM-stable (markdown or JSON produced from SQLite).

| URI pattern | Description |
|-------------|-------------|
| `cadence://activity?from=YYYY-MM-DD&to=YYYY-MM-DD` | Activity for a date range (markdown or JSON). |
| `cadence://activity/today` | Today’s activity. |
| `cadence://context/job-description` | Job description markdown. |
| `cadence://context/projects` | List of projects; optional `cadence://context/projects/<id>` for one project. |
| `cadence://context/goals` | Goals markdown. |
| `cadence://reviews?type=weekly|monthly|quarterly|on-demand&from=&to=` | Reviews in range (metadata + content). |
| `cadence://reviews/<id>` | Single review by id. |
| `cadence://export/bundle?from=&to=` | Full export bundle (manifest + references or inline content). |

Clients resolve these URIs and get markdown or JSON; the MCP server reads from SQLite and produces the output (same as the “produce MD” layer).

### Tools (actions)

Tools let the client (and thus your LLM) **do** something with Cadence, not just read.

| Tool | Purpose |
|------|--------|
| **query_activity** | Query activity with filters (date range, project, tag). Returns markdown or structured JSON. |
| **produce_review** | Request an on-demand review for a period. Writes to DB and returns the generated review (markdown + optional JSON). |
| **produce_activity_md** | Produce activity as markdown for a date range (same as export activity). |
| **produce_export_bundle** | Generate full export bundle for a range; return path or manifest. |
| **ask** (optional) | Natural-language question over the data (e.g. “How did I spend time on dTAK last month?”). Server runs a query or small pipeline and returns an answer (markdown or JSON). Requires the server to have query/LLM logic; can be a thin wrapper over SQL + optional local LLM. |

Your LLM can call these tools (e.g. “Get my activity for last week”, “Generate a review for last quarter”, “Summarize my performance for project X”) and then use the returned content in the conversation.

---

## Deployment

- **Same process as the app** — The Cadence desktop app can embed an MCP server that listens on a port or stdio when “MCP mode” is enabled, using the same `cadence.db` and produce-MD logic.
- **Standalone server** — Alternatively, a separate Cadence MCP server process (CLI or daemon) that points at the same data directory and exposes only resources + tools. Lets you use Cadence from a client that doesn’t run the full UI.

In both cases, the **data** is the same (SQLite + produce-MD); the MCP layer is another **consumer** of that data and those commands.

---

## Version and status

- **Status:** Spec / intended surface. Implementation follows after core app (SQLite, capture, produce-MD) is in place.
- **Compatibility:** MCP layer will follow the official [Model Context Protocol](https://modelcontextprotocol.io/) spec so any compliant client can connect.

This document will be updated when resources and tools are implemented and when URI/tool names are finalized.
