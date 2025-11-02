const Database = require('better-sqlite3');

// Database directory
const dbPath = __dirname + "/../../../data/database.sqlite";

try {
    // Create database.sqlite in case it doesnt exist.
    const db = new Database(dbPath);

    // Create new options table in case it doesnt exist.
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

    // Create new statistics table in case it doesnt exist.
    db.prepare(`
    CREATE TABLE IF NOT EXISTS statistics (
        id INTEGER PRIMARY KEY,
        messages_scanned INTEGER DEFAULT 0,
        messages_deleted INTEGER DEFAULT 0
    )`).run();

    // Insert something into the statisctics table so SQLite wont complain.
    db.prepare(`
        INSERT OR IGNORE INTO statistics (id) VALUES (1)
    `).run();

    module.exports = db;
} catch (error) {
    console.log(error);
}