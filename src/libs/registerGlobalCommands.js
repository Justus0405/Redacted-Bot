require('dotenv').config({ quiet: true });
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, } = require('discord.js');

const commands = [
    {
        name: 'help',
        description: 'Get information about </Redacted> and its features',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
    },
    {
        name: 'setup',
        description: 'Setup the bot by selecting a logging channel',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
        options: [
            {
                name: 'channel',
                description: 'The logging channel',
                type: ApplicationCommandOptionType.Channel,
                required: true
            }
        ]
    },
    {
        name: 'statistics',
        description: 'Get information about </Redacted> servers',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
    },
    {
        name: 'whitelist',
        description: 'Manage allowed & forbidden words',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
        options: [
            {
                name: 'list',
                description: 'List all whitelisted words',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'add',
                description: 'Add a word to the whitelist',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'value',
                        description: 'The word',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: 'remove',
                description: 'Remove a word from the whitelist',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'value',
                        description: 'The word',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
        ]
    },
    {
        name: 'hierarchy',
        description: 'Select if the bot should punish users above it',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
        options: [
            {
                name: 'option',
                description: 'true or false',
                type: ApplicationCommandOptionType.Boolean,
                required: true
            }
        ]
    },
    {
        name: 'warning',
        description: 'Select if the bot should log messages with a toxic rating between 70-90%',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
        options: [
            {
                name: 'option',
                description: 'true or false',
                type: ApplicationCommandOptionType.Boolean,
                required: true
            }
        ]
    },
    {
        name: 'punishment',
        description: 'Select what the bot should do when a message is above 90% toxic',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
        options: [
            {
                name: 'delete',
                description: 'Delete the offending message',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'mute',
                description: 'Mute the message author',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'both',
                description: 'Delete the offending message and mute the author',
                type: ApplicationCommandOptionType.Subcommand,
            },
        ]
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('[  ] Registering global slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('[  ] Global slash commands were registered successfully!');
    } catch (error) {
        console.log(error);
    }
})();