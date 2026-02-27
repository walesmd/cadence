use crate::error::AppError;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePool};
use std::path::PathBuf;
use std::str::FromStr;

pub type DbPool = SqlitePool;

/// Initialize the database: create app data dir, open/create DB, run migrations.
///
/// Migrations are idempotent: SQLx tracks applied migrations in `_sqlx_migrations`;
/// already-applied migrations are skipped on subsequent runs.
///
/// SQLite handles force-quit resilience via WAL mode (default). Avoid long uncommitted
/// transactions; Migrator completes before the app serves requests.
///
/// Returns the pool and the database path for logging.
pub async fn init_db(app_data_dir: PathBuf) -> Result<(DbPool, PathBuf), AppError> {
    std::fs::create_dir_all(&app_data_dir).map_err(|e| {
        AppError::database(format!("Failed to create app data directory: {}", e))
    })?;

    let db_path = app_data_dir.join("cadence.db");
    let db_url = format!("sqlite:{}?mode=rwc", db_path.display());

    let options = SqliteConnectOptions::from_str(&db_url)
        .map_err(|e| AppError::database(format!("Invalid database URL: {}", e)))?
        .create_if_missing(true);

    let pool = SqlitePool::connect_with(options)
        .await
        .map_err(|e| AppError::database(format!("Failed to connect to database: {}", e)))?;

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .map_err(|e| AppError::database(format!("Failed to run migrations: {}", e)))?;

    Ok((pool, db_path))
}
