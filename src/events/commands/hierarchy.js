const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const manageSQLite = require('../../libs/manageSQLite');
const sendErrorMessage = require('../../libs/sendErrorMessage');

async function hierarchy(interaction) {

    const option = interaction.options.getBoolean('option');

    const dbOption = { hierarchy: option };

    // Database code
    manageSQLite.prepare(`
                UPDATE servers
                SET settings = ?
                WHERE guild_id = ?`
    ).run(JSON.stringify(dbOption), interaction.guild.id);

    sendSuccessMessage(interaction, `Successfully changed hierarchy to ${option}`);
}

module.exports = hierarchy;