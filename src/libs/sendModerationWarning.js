const { EmbedBuilder } = require('discord.js');
const sendDebugMessage = require('./sendDebugMessage');
const getLogChannel = require('./getLogChannel');

async function sendModerationWarning(message, toxicScore) {

    const logChannel = await getLogChannel(message.guild);

    // Ignore the message when no log channel is set.
    if (!logChannel) {
        sendDebugMessage('No log channel available');
        return;
    }

    const messageUrl = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;

    const embed = new EmbedBuilder()
        .setTitle('⚠️ Potentially Offensive Message')
        .setDescription('A message was flagged as potentially offensive.')
        .addFields(
            { name: 'Toxicity Score', value: `\`${toxicScore}\``, inline: true },
            { name: 'Author', value: `<@${message.author.id}>`, inline: true },
            { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
            { name: 'Jump to Message', value: `[Click Here](${messageUrl})`, inline: true }
        )
        .addFields(
            { name: 'Message', value: `\`\`\`${message.content || 'No content'}\`\`\`` }
        )
        .setColor('#fab387')
        .setTimestamp();

    try {

        // Send log.
        await logChannel.send({ embeds: [embed] });
    } catch (error) {
        console.log(error);
        return
    }
}

module.exports = sendModerationWarning;