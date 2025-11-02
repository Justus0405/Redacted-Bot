const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const manageSQLite = require('../../libs/manages/manageSQLite');

async function punishment(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "delete":

            manageSQLite.prepare(`
                UPDATE settings
                SET setting_punishment = ?
                WHERE guild_id = ?`
            ).run(1, interaction.guild.id);

            sendSuccessMessage(interaction, `Successfully changed punishment to \`delete\``);
            break;

        case "mute":

            manageSQLite.prepare(`
                UPDATE settings
                SET setting_punishment = ?
                WHERE guild_id = ?`
            ).run(2, interaction.guild.id);

            sendSuccessMessage(interaction, `Successfully changed punishment to \`mute\``);
            break;

        case "both":

            manageSQLite.prepare(`
                UPDATE settings
                SET setting_punishment = ?
                WHERE guild_id = ?`
            ).run(3, interaction.guild.id);

            sendSuccessMessage(interaction, `Successfully changed punishment to \`both\``);
            break;

        default:
            break;
    }

}

module.exports = punishment;