const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const manageSQLite = require('../../libs/manages/manageSQLite');

async function warnings(interaction) {

    const option = interaction.options.getBoolean('enabled');

    const setting = option ? 1 : 0;

    manageSQLite.prepare(`
                UPDATE settings
                SET setting_warnings = ?
                WHERE guild_id = ?
    `).run(setting, interaction.guild.id);

    sendSuccessMessage(interaction, `Successfully changed warnings to \`${option}\``);
}

module.exports = warnings;