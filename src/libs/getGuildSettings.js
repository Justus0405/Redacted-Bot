const sendDebugMessage = require('./sendDebugMessage');
const manageSQLite = require("../libs/manageSQLite");

async function getGuildSettings(guild) {

    // Get guild settings as a json object.
    const row = manageSQLite
        .prepare(`
            SELECT settings
            FROM servers
            WHERE guild_id = ?`)
        .get(guild.id);

    const settings = JSON.parse(row.settings)

    sendDebugMessage(`Settings row: ${settings.hierarchy}`)

    return settings
}

module.exports = getGuildSettings;