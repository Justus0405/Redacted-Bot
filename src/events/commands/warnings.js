const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const manageSQLite = require('../../libs/manageSQLite');

async function warnings(interaction) {

    const option = interaction.options.getBoolean('option');

    const setting = option ? 1 : 0;

    manageSQLite.prepare(`
                UPDATE settings
                SET setting_warnings = ?
                WHERE guild_id = ?`
    ).run(setting, interaction.guild.id);

    sendSuccessMessage(interaction, `Successfully changed warnings to \`${option}\``);
}

module.exports = warnings;