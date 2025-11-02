const manageSQLite = require('../manages/manageSQLite');

async function getStatistics() {

    // Get guild settings as a json object.
    const row = manageSQLite
        .prepare(`
            SELECT messages_scanned, messages_deleted
            FROM statistics
            WHERE id = 1
        `)
        .get();

    return row
}

module.exports = getStatistics;