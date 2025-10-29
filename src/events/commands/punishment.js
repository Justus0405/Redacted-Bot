const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sendDebugMessage');
const manageSQLite = require('../../libs/manageSQLite');

async function punishment(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "delete":

            manageSQLite.prepare(`
                UPDATE settings
                SET setting_punishment = ?
                WHERE guild_id = ?`
            ).run(1, interaction.guild.id);

            sendDebugMessage("Changed punishment to: delete");

            sendSuccessMessage(interaction, `Successfully changed punishment to \`delete\``);
            break;

        case "mute":

            manageSQLite.prepare(`
                UPDATE settings
                SET setting_punishment = ?
                WHERE guild_id = ?`
            ).run(2, interaction.guild.id);

            sendDebugMessage("Changed punishment to: mute");

            sendSuccessMessage(interaction, `Successfully changed punishment to \`mute\``);
            break;

        case "both":

            manageSQLite.prepare(`
                UPDATE settings
                SET setting_punishment = ?
                WHERE guild_id = ?`
            ).run(3, interaction.guild.id);

            sendDebugMessage("Changed punishment to: both");

            sendSuccessMessage(interaction, `Successfully changed punishment to \`both\``);
            break;

        default:
            break;
    }

}

module.exports = punishment;