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
    CREATE TABLE IF NOT EXISTS servers (
        guild_id TEXT PRIMARY KEY,
        log_channel_id TEXT NOT NULL,
        whitelist TEXT DEFAULT ['fuck'],
        settings TEXT DEFAULT []
    )`).run();

    module.exports = db;
} catch (error) {
    console.log(error);
}