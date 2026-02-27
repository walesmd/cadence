-- Cadence initial schema
-- Tables: activity_entries, context_items, reviews, metadata
-- Schema version: 1

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

CREATE TABLE context_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  name TEXT,
  slug TEXT,
  content TEXT,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_context_items_type ON context_items(type);

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

CREATE TABLE metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

INSERT INTO metadata (key, value, updated_at) VALUES ('schema_version', '1', datetime('now'));
