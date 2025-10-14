const { EmbedBuilder } = require('discord.js');
const manageSQLite = require('../../libs/manageSQLite');

async function setup(interaction) {

    const channel = interaction.options.getChannel('channel');

    // Database code
    manageSQLite.prepare(`
                INSERT INTO servers (guild_id, log_channel_id)
                VALUES (?, ?)
                ON CONFLICT(guild_id) DO UPDATE SET log_channel_id = excluded.log_channel_id`
    ).run(interaction.guild.id, channel.id);

    const embedBanner = new EmbedBuilder()
        .setImage("https://cdn.discordapp.com/attachments/1282806337201246261/1422685217927205014/Redacted_Banner_Setup.png?ex=68dd925c&is=68dc40dc&hm=c3a2d4f1036befcc3da65b67f528d7630b1b57673a8c57e4325be3bb3e3c90fa&")
        .setColor("#ffffff");

    const embedContent = new EmbedBuilder()
        .setTitle("</Redacted> Setup")
        .setDescription("The </Redacted> Discord bot has been successfully configured.\n\nPlease ensure the bot has **write permissions** in your designated logging channel. Once active, the bot will monitor all accessible channels on your server, automatically ignoring whitelisted words and removing any flagged content.\n\nTo adjust these settings or explore additional features, use the `/help` command.")
        .setColor("#ffffff")
        .setTimestamp();

    await interaction.reply({ embeds: [embedBanner, embedContent], flags: 64 });
}

module.exports = setup;