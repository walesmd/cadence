//! Integration test: DB init creates tables and migrations are idempotent.

use app_lib::db::init_db;

#[tokio::test]
async fn init_db_creates_tables_and_migrations_are_idempotent() {
    let temp_dir = std::env::temp_dir().join(format!("cadence_db_test_{}", std::process::id()));
    let _ = std::fs::remove_dir_all(&temp_dir);
    std::fs::create_dir_all(&temp_dir).unwrap();

    // First init: creates DB and runs migrations
    let (pool1, db_path) = init_db(temp_dir.clone()).await.unwrap();
    assert!(db_path.exists(), "Database file should exist");

    // Verify tables exist
    let tables: Vec<(String,)> = sqlx::query_as("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
        .fetch_all(&pool1)
        .await
        .unwrap();

    let table_names: Vec<String> = tables.into_iter().map(|t| t.0).collect();
    assert!(
        table_names.contains(&"activity_entries".to_string()),
        "activity_entries table should exist, got: {:?}",
        table_names
    );
    assert!(
        table_names.contains(&"context_items".to_string()),
        "context_items table should exist"
    );
    assert!(
        table_names.contains(&"reviews".to_string()),
        "reviews table should exist"
    );
    assert!(
        table_names.contains(&"metadata".to_string()),
        "metadata table should exist"
    );

    drop(pool1);

    // Second init on same path: should open existing DB, run migrations (no-op)
    let (pool2, _) = init_db(temp_dir.clone()).await.unwrap();

    // Metadata should still have schema_version
    let (version,): (String,) =
        sqlx::query_as("SELECT value FROM metadata WHERE key = 'schema_version'")
            .fetch_one(&pool2)
            .await
            .unwrap();
    assert_eq!(version, "1");

    // Cleanup
    let _ = std::fs::remove_dir_all(&temp_dir);
}
