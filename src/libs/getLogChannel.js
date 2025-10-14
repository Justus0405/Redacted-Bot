const sendDebugMessage = require('./sendDebugMessage');
const manageSQLite = require("../libs/manageSQLite");

async function getLogChannel(guild) {

    // Get log_channel_id as string.
    const row = manageSQLite
        .prepare("SELECT log_channel_id FROM servers WHERE guild_id = ?")
        .get(guild.id);

    // If no entry is found return null which ignores the message.
    if (!row || !row.log_channel_id) {
        await sendDebugMessage(`No log channel ID found for guild ${guild.id}`);
        return null;
    }

    try {
        // Because the id in the database is just a string and we need the object to send messages
        // to the log channel, it is fetched here.
        const channel = await guild.channels.fetch(row.log_channel_id);
        if (!channel) {
            await sendDebugMessage(`Could not fetch log channel with ID ${row.log_channel_id}`);
            return null;
        }
        return channel;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = getLogChannel;
