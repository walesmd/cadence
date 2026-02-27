# Story 1.2: Initialize Local Database with Platform Storage

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want the app to automatically initialize a local SQLite database in my platform's application data directory on first launch,
So that my data has a persistent, reliable home that survives app restarts and upgrades.

## Acceptance Criteria

**Given** the app launches for the first time,
**When** startup completes,
**Then** a SQLite database file is created in the platform app data directory (e.g. `~/Library/Application Support/cadence/cadence.db` on macOS).

**Given** the database is initialized,
**When** inspected,
**Then** it contains tables: `activity_entries`, `context_items`, `reviews`, and `metadata`.

**Given** the app is launched a second time,
**When** startup completes,
**Then** the existing database is opened and no migrations are re-applied.

**Given** a future schema migration is added,
**When** the app launches,
**Then** pending migrations are applied automatically without data loss.

**Given** the app is force-quit mid-write,
**When** reopened,
**Then** the database is intact and readable.

## Tasks / Subtasks

- [x] Task 1: Add SQLx and platform path dependencies (AC: 1)
  - [x] 1.1 Add sqlx to Cargo.toml with features: sqlite, runtime-tokio, migrate, chrono
  - [x] 1.2 Add tauri::path::app_data_dir() or equivalent for platform app data path
  - [x] 1.3 Create app data directory if it does not exist
  - [x] 1.4 Resolve database path: `{app_data_dir}/cadence.db`

- [x] Task 2: Create initial migration (AC: 2)
  - [x] 2.1 Create `app/src-tauri/migrations/` directory
  - [x] 2.2 Create `001_initial_schema.sql` with tables: activity_entries, context_items, reviews, metadata
  - [x] 2.3 Follow architecture naming: snake_case, plural table names, indexes per pattern
  - [x] 2.4 Add schema_version to metadata table; set to 1

- [x] Task 3: Initialize database layer (AC: 1, 2, 3, 4)
  - [x] 3.1 Create `app/src-tauri/src/db/` module (mod.rs, pool.rs or init.rs)
  - [x] 3.2 Implement async pool init: create/open DB, run migrations via sqlx::migrate!
  - [x] 3.3 Wire DB init into Tauri startup (lib.rs run()) before builder
  - [x] 3.4 Return AppError on init failure; log success with DB path

- [x] Task 4: Verify idempotent migration (AC: 3)
  - [x] 4.1 Document that Migrator::run() is idempotent (sqlx tracks applied migrations)
  - [x] 4.2 Add smoke test or manual verification: second launch does not re-apply

- [x] Task 5: Handle force-quit resilience (AC: 5)
  - [x] 5.1 Rely on SQLite WAL mode (default) for durability
  - [x] 5.2 Ensure Migrator completes before app serves requests
  - [x] 5.3 Document: SQLite handles mid-write; app should avoid long uncommitted transactions

## Dev Notes

### Architecture Compliance

**[Source: _bmad-output/planning-artifacts/architecture.md]**

- **Query Layer:** SQLx (compile-time checked SQL, async, built-in migrations)
- **Migration Approach:** SQLx built-in migrations; additive-only; schema version in metadata table
- **Migration Location:** `app/src-tauri/migrations/`
- **Database Boundary:** Only `db/` module touches SQLx; commands call db functions
- **Tables (snake_case, plural):** activity_entries, context_items, reviews, metadata
- **Indexes:** `idx_{table}_{column}` e.g. idx_activity_entries_date

### Technical Requirements

1. **Platform paths (per docs/STORAGE-FORMAT.md):**
   - macOS: `~/Library/Application Support/cadence/cadence.db`
   - Windows: `%APPDATA%/cadence/cadence.db`
   - Linux: `~/.local/share/cadence/cadence.db`
   - Use Tauri's `tauri::path::app_data_dir(&config)` or `app.path().app_data_dir()` to resolve

2. **SQLx version:** 0.8.x with features: sqlite, runtime-tokio, migrate, chrono (for ISO 8601 dates)

3. **Schema (from STORAGE-FORMAT + architecture):**
   - **activity_entries:** id, date, time (optional), raw_input, parsed (JSON or columns), created_at. Append-only for audit.
   - **context_items:** id, type (job_description | project | goals), name/slug, content (markdown), updated_at
   - **reviews:** id, period_type (weekly | monthly | quarterly | on-demand), period_start, period_end, content (markdown), structured (JSON nullable), created_at
   - **metadata:** schema_version, key, value (or similar for settings)

4. **Migration execution:** Call `sqlx::migrate!("./migrations").run(&pool).await` at startup. SQLx tracks applied migrations in `_sqlx_migrations` table.

5. **Error handling:** DB init failures must return AppError::database(...); never panic. Log path on success.

### Schema DDL Reference

**activity_entries:**
```sql
CREATE TABLE activity_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  time TEXT,
  raw_input TEXT NOT NULL,
  parsed TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_activity_entries_date ON activity_entries(date);
CREATE INDEX idx_activity_entries_created_at ON activity_entries(created_at);
```

**context_items:**
```sql
CREATE TABLE context_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  name TEXT,
  slug TEXT,
  content TEXT,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_context_items_type ON context_items(type);
```

**reviews:**
```sql
CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period_type TEXT NOT NULL,
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  content TEXT NOT NULL,
  structured TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_reviews_period_start ON reviews(period_start);
```

**metadata:**
```sql
CREATE TABLE metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
INSERT INTO metadata (key, value, updated_at) VALUES ('schema_version', '1', datetime('now'));
```

### Project Structure (After This Story)

```
app/src-tauri/
  src/
    main.rs
    lib.rs
    error.rs
    db/
      mod.rs
      pool.rs         # or init.rs — connection pool, migrate on init
  migrations/
    001_initial_schema.sql
  Cargo.toml          # + sqlx, tokio (if not already)
```

### Previous Story Intelligence (1.1)

- **AppError:** Already in `error.rs`; use `AppError::database(message)` for DB errors
- **Tauri setup:** lib.rs has `run()`; DB init must happen early, before `tauri::Builder`
- **Cargo.toml:** Tauri 2, tauri-plugin-log (tracing), serde; add sqlx
- **Path:** Tauri 2 uses `tauri::Manager`; app data dir via `app.path().app_data_dir()` — verify Tauri 2 API for path resolution at startup (may need to use `tauri::generate_context!()` or pass config)
- **Async:** Tauri 2 commands are async; ensure pool is created in async context and stored (e.g. in app state/Manage) for later commands

### Tauri 2 App Data Path

Tauri 2 exposes paths via the app context. At startup, before the builder runs, you may need to use `tauri::api::path::app_data_dir()` with the app's config, or initialize DB inside a setup hook that has access to the app. Check Tauri 2 docs for `tauri::plugin::Builder::setup()` or similar to run async init with app handle.

### Warnings / Gotchas

- **SQLx offline mode:** For CI/build without DB, use `SQLX_OFFLINE=true` and `cargo sqlx prepare` to generate `.sqlx` cache. Story 1.2 can start with runtime-only migrations; offline can be added in CI story (1.5).
- **Chrono vs time:** Architecture specifies chrono for dates; use `chrono` feature in SQLx if available, or store ISO 8601 strings in TEXT columns.
- **WAL mode:** SQLite defaults to WAL; good for durability. No extra config needed for AC5.

### References

- [Source: docs/STORAGE-FORMAT.md] — Platform paths, schema high-level
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Architecture] — SQLx, migrations, db/ boundary
- [Source: _bmad-output/planning-artifacts/architecture.md#Naming Patterns] — Table/column/index naming
- [Source: _bmad-output/implementation-artifacts/1-1-set-up-full-tech-stack-on-tauri-scaffold.md] — AppError, lib structure

## Dev Agent Record

### Agent Model Used

Auto (dev-story workflow)

### Debug Log References

### Completion Notes List

- Ultimate context engine analysis completed — comprehensive developer guide created (create-story workflow)
- SQLx 0.8 added with sqlite, runtime-tokio, migrate, chrono. Platform path via app.path().app_data_dir() in setup hook.
- migrations/001_initial_schema.sql with activity_entries, context_items, reviews, metadata. db/pool.rs init_db creates dir, opens DB, runs migrations.
- DB init in Builder::setup using tauri::async_runtime::block_on; pool stored via app.manage(). Logs path on success.
- Integration test tests/db_init_test.rs verifies tables exist and migrations are idempotent (second init does not re-apply).
- [Code Review] Added pool.rs docs for Migrator idempotency and SQLite mid-write resilience. Updated STORAGE-FORMAT.md with actual Tauri path (com.cadence.app). Added Cargo.lock to File List.

### Change Log

- 2026-02-26: Code review fixes — pool.rs documentation, STORAGE-FORMAT path, Cargo.lock in File List.
- 2026-02-26: Story 1.2 implementation complete — SQLite + SQLx, platform app data dir, migrations, db module, integration test.

### File List

- app/src-tauri/Cargo.lock (modified)
- app/src-tauri/Cargo.toml (modified)
- app/src-tauri/migrations/001_initial_schema.sql (new)
- app/src-tauri/src/db/mod.rs (new)
- app/src-tauri/src/db/pool.rs (new)
- app/src-tauri/src/lib.rs (modified)
- app/src-tauri/tests/db_init_test.rs (new)
