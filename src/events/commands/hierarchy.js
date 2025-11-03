const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const manageSQLite = require('../../libs/manages/manageSQLite');

async function hierarchy(interaction) {

    const option = interaction.options.getBoolean('enabled');

    // Fancy tenary operator shit.
    // Basically like if/else but in a single line.
    // if option is true, then the value should be 1, else 0;
    const setting = option ? 1 : 0;

    manageSQLite.prepare(`
                UPDATE settings
                SET setting_hierarchy = ?
                WHERE guild_id = ?`
    ).run(setting, interaction.guild.id);

    sendSuccessMessage(interaction, `Successfully changed hierarchy to \`${option}\``);
}

module.exports = hierarchy;