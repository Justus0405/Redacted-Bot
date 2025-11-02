const manageSQLite = require('../manages/manageSQLite');

async function getGuildSetup(guild) {

    try {

        const row = manageSQLite
            .prepare(`
            SELECT log_channel_id
            FROM settings
            WHERE guild_id = ?`)
            .get(guild.id);

        if (!row) {
            return null;
        }

        // Return true when the guild has completed the setup process.
        return true;

    } catch (error) {
        return null;
    }

}

module.exports = getGuildSetup;