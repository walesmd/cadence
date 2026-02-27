pub mod db;
mod error;

use db::init_db;
use error::AppError;
use tauri::Manager;
use tauri_plugin_log::{Target, TargetKind};

#[tauri::command]
fn greet(name: &str) -> Result<String, AppError> {
    tracing::info!("greet called with name: {}", name);
    if name.is_empty() {
        return Err(AppError::validation("Name cannot be empty"));
    }
    Ok(format!("Hello, {}! You've been greeted from Rust!", name))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().targets([
            Target::new(TargetKind::Stdout),
            Target::new(TargetKind::LogDir { file_name: None }),
            Target::new(TargetKind::Webview),
        ]).build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_data_dir = match app.path().app_data_dir() {
                Ok(dir) => dir,
                Err(e) => {
                    tracing::error!("Failed to get app data dir: {}", e);
                    return Ok(());
                }
            };

            let init_result = tauri::async_runtime::block_on(async move { init_db(app_data_dir).await });

            match init_result {
                Ok((pool, db_path)) => {
                    app.manage(pool);
                    tracing::info!("Database initialized at {}", db_path.display());
                }
                Err(e) => {
                    tracing::error!("Database initialization failed: {}", e);
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
