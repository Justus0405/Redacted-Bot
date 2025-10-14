const { EmbedBuilder } = require('discord.js');
const sendDebugMessage = require('./sendDebugMessage');

async function sendModerationDone(message, toxicScore) {

    const logChannel = await getLogChannel(message.guild);

    // Ignore the message when no log channel is set.
    if (!logChannel) {
        sendDebugMessage('No log channel available');
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle('⚠️ Message Removed')
        .setDescription('A message was flagged as potentially offensive and has been deleted.')
        .addFields(
            { name: 'Toxicity Score', value: `\`${toxicScore}\``, inline: true },
            { name: 'Author', value: `<@${message.author.id}>`, inline: true },
            { name: 'Channel', value: `<#${message.channel.id}>`, inline: true }
        )
        .addFields(
            { name: 'Deleted Message', value: `\`\`\`${message.content || 'No content'}\`\`\`` }
        )
        .setColor('#f38ba8')
        .setTimestamp();

    try {

        // Send log before deleting the message lol.
        await logChannel.send({ embeds: [embed] });

        // Delete the message.
        await message.delete();
    } catch (error) {
        console.log(error)
        return
    }
}

module.exports = sendModerationDone;