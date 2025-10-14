const { EmbedBuilder } = require('discord.js');

async function help(interaction) {

    const embedBanner = new EmbedBuilder()
        .setImage("https://cdn.discordapp.com/attachments/1282806337201246261/1422685141221769226/Redacted_Banner_Help.png?ex=68dd9249&is=68dc40c9&hm=62c279c8c9549a57217d2877036554f9211fe49732536778f038e88d53e11b53&")
        .setColor("#ffffff");

    const embedContent = new EmbedBuilder()
        .setTitle('Command Overview')
        .setDescription('Quick reference of all available commands.')
        .addFields(
            {
                name: 'Getting Started',
                value: [
                    '`/help` — Get information about </Redacted> and its features',
                    '`/setup` - Get started by selecting a log channel',
                    '`/statistics` - Get information about </Redacted> servers',
                ].join('\n'),
                inline: false,
            },
            {
                name: 'Manage Allowed & Forbidden Words',
                value: [
                    '`/whitelist` `list` - Show all whitelisted words',
                    '`/whitelist` `add` - Add a word to the whitelist',
                    '`/whitelist` `remove` - Remove a word from the whitelist',
                ].join('\n'),
                inline: false,
            },
            {
                name: 'Role behavior',
                value: [
                    '`/hierarchy` `true` - Ignore users above </Redacted>',
                    '`/hierarchy` `false` - Include users above </Redacted>',
                ].join('\n'),
                inline: false,
            },
            {
                name: 'Should </Redacted> log messages with a toxic rating between 70-90%',
                value: [
                    '`/warnings` `true` - Send a log message',
                    '`/warnings` `false` - Dont send a log message',
                ].join('\n'),
                inline: false,
            },
            {
                name: 'What should </Redacted> do when a message is above 90% toxic',
                value: [
                    '`/punishment` `delete` - Delete message',
                    '`/punishment` `mute` - Mute user',
                    '`/punishment` `both` - Delete message and mute user',
                ].join('\n'),
                inline: false,
            },
        )
        .setColor("#ffffff")
        .setTimestamp();

    await interaction.reply({ embeds: [embedBanner, embedContent], flags: 64 });
}

module.exports = help;