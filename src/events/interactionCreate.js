// Commands Moderators.
const helpCommand = require('./commands/help');
const setupCommand = require('./commands/setup');
const hierarchyCommand = require('./commands/hierarchy');
const warningsCommand = require('./commands/warnings');

module.exports = (client) => {

    // Slash commands interactions.
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        switch (interaction.commandName) {

            // Moderator Commands.
            case 'help':
                helpCommand(interaction);
                break;
            case 'setup':
                setupCommand(interaction);
                break;
            case 'hierarchy':
                hierarchyCommand(interaction);
                break;
            case 'warnings':
                warningsCommand(interaction);
                break;

            // Unkown Commands.
            default:
                break;
        }
    });
}