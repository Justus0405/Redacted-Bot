const sendDebugMessage = require('./sendDebugMessage');
const Database = require('better-sqlite3');
const path = require('path');

// Database directory.
const dbPath = path.join(__dirname, "..", "..", "data", "database.sqlite");
sendDebugMessage(`Database Path: ${dbPath}`)

try {
    // Create database.sqlite in case it doesnt exist.
    const db = new Database(dbPath);

    // Create new table in case it doesnt exist.
    // TODO: Convert whitelist array in messageCreate.js to database.
    db.prepare(`
    CREATE TABLE IF NOT EXISTS settings (
        guild_id TEXT PRIMARY KEY,
        log_channel_id TEXT NOT NULL,
        setting_whitelist TEXT DEFAULT [fuck, shit],
        setting_hierarchy TEXT DEFAULT [1.0],
        setting_warnings TEXT DEFAULT [1.0],
        setting_punishment TEXT DEFAULT [1.0]
    )`).run();

    module.exports = db;
} catch (error) {
    console.log(error);
}