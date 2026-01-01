// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // NOTE: Currently only using the rust backend just to render the frontend, prolly add a sqlitedb or remote api later
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
