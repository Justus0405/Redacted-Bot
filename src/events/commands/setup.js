const { EmbedBuilder } = require('discord.js');
const manageSQLite = require('../../libs/manages/manageSQLite');

async function setup(interaction) {

    const channel = interaction.options.getChannel('channel');

    manageSQLite.prepare(`
                INSERT INTO settings (guild_id, log_channel_id)
                VALUES (?, ?)
                ON CONFLICT(guild_id) DO UPDATE SET log_channel_id = excluded.log_channel_id
    `).run(interaction.guild.id, channel.id);

    const embed = new EmbedBuilder()
        .setTitle('</Redacted> Setup')
        .setDescription('The </Redacted> Discord bot has been successfully configured.\n\nPlease ensure the bot has **write permissions** in your designated logging channel. Once active, the bot will monitor all accessible channels on your server, automatically ignoring whitelisted words and removing any flagged content.\n\nTo adjust these settings or explore additional features, use the `/help` command.')
        .setColor('#ffffff')
        .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 });
}

module.exports = setup;