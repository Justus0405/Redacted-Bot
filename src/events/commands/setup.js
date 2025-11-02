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
        .setTitle('Setup Complete!')
        .addFields(
            { name: '', value: 'The bot has been successfully configured.', inline: false },
            { name: '', value: 'Please ensure the bot has **write permissions** in your designated logging channel.', inline: false },
            { name: '', value: 'Once active, the bot will monitor all accessible channels on your server, automatically ignoring whitelisted words and removing any flagged content.', inline: false },
            { name: '', value: 'To adjust these settings or explore additional features, use the `/help` command.', inline: false }
        )
        .setColor('#ffffff')
        .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 });
}

module.exports = setup;