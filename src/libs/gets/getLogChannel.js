const manageSQLite = require('../manages/manageSQLite');

async function getLogChannel(guild) {

    // Get log_channel_id as string.
    const row = manageSQLite
        .prepare(`
            SELECT log_channel_id
            FROM settings
            WHERE guild_id = ?`)
        .get(guild.id);

    try {
        // Because the id in the database is just a string and we need the object to send messages
        // to the log channel, it is fetched here.
        const channel = await guild.channels.fetch(row.log_channel_id);
        if (!channel) {
            return null;
        }
        return channel;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = getLogChannel;
