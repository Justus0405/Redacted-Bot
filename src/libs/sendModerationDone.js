const { EmbedBuilder } = require('discord.js');
const sendDebugMessage = require('./sendDebugMessage');
const getLogChannel = require('./getLogChannel');
const getGuildSetting = require('./getGuildSetting')

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

        // Get the current punishment setting.
        const optionPunishment = await getGuildSetting(message.guild, "setting_punishment");

        // Switch case doesnt recognize floats by default?
        sendDebugMessage(`Setting Punishment: ${optionPunishment.setting_punishment}`);

        const punishment = Number(optionPunishment.setting_punishment);

        sendDebugMessage(`Setting Punishment Number: ${punishment}`);

        // Execute the punishment.
        switch (punishment) {
            case 1:
                await message.delete();
                break;

            case 2:
                // 1 Hour hardcoded timeout, maybe add option for this in the future.
                await message.author.timeout(1 * 60 * 60 * 1000, "AUTOMUTE: Hatespeech");
                break;

            case 3:
                await message.author.timeout(1 * 60 * 60 * 1000, "AUTOMUTE: Hatespeech");
                await message.delete();
                break;

            default:
                break;
        }

    } catch (error) {
        console.log(error)
        return
    }
}

module.exports = sendModerationDone;