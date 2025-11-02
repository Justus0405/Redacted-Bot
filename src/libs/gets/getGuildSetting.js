const manageSQLite = require('../manages/manageSQLite');

async function getGuildSetting(guild, setting) {

    // Get guild settings as a json object.
    const row = manageSQLite
        .prepare(`
            SELECT ${setting}
            FROM settings
            WHERE guild_id = ?`)
        .get(guild.id);

    return row
}

module.exports = getGuildSetting;