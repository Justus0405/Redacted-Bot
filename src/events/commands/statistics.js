const { EmbedBuilder } = require('discord.js');
const getStatistics = require('../../libs/gets/getStatistics');
const manageUptime = require('../../libs/manages/manageUptime');

async function statistics(interaction) {

    const statistics = await getStatistics();

    const bot_uptime = await manageUptime();

    const bot_version = "b623675";

    const embed = new EmbedBuilder()
        .setTitle('Statistics Overview')
        .addFields(
            { name: 'Scanned Messages', value: `\`\`\`${statistics.messages_scanned || 'none'}\`\`\``, inline: true },
            { name: 'Deleted Messages', value: `\`\`\`${statistics.messages_deleted || 'none'}\`\`\``, inline: true },
            { name: 'Uptime', value: `\`\`\`${bot_uptime || 'none'}\`\`\``, inline: true },
            { name: 'Version', value: `\`\`\`${bot_version || 'none'}\`\`\``, inline: true }
        )
        .setColor('#ffffff')
        .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 });
}

module.exports = statistics;