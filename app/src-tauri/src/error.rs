use serde::Serialize;
use std::fmt;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AppError {
    pub kind: String,
    pub message: String,
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.kind, self.message)
    }
}

impl std::error::Error for AppError {}

impl AppError {
    pub fn not_found(message: impl Into<String>) -> Self {
        Self {
            kind: "NotFound".to_string(),
            message: message.into(),
        }
    }

    pub fn database(message: impl Into<String>) -> Self {
        Self {
            kind: "DatabaseError".to_string(),
            message: message.into(),
        }
    }

    pub fn validation(message: impl Into<String>) -> Self {
        Self {
            kind: "ValidationError".to_string(),
            message: message.into(),
        }
    }

    pub fn nlp(message: impl Into<String>) -> Self {
        Self {
            kind: "NlpError".to_string(),
            message: message.into(),
        }
    }

    pub fn export(message: impl Into<String>) -> Self {
        Self {
            kind: "ExportError".to_string(),
            message: message.into(),
        }
    }

    pub fn internal(message: impl Into<String>) -> Self {
        Self {
            kind: "Internal".to_string(),
            message: message.into(),
        }
    }
}

// AppError implements Serialize; Tauri's blanket impl provides From<AppError> for InvokeError
