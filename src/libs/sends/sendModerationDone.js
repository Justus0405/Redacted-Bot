const { EmbedBuilder } = require('discord.js');
const manageStatistics = require('../manages/manageStatistics');
const getGuildSetting = require('../gets/getGuildSetting');
const getLogChannel = require('../gets/getLogChannel');

async function sendModerationDone(message, toxicScore) {

    const logChannel = await getLogChannel(message.guild);

    // Ignore the message when no log channel is set.
    if (!logChannel) {
        return;
    }

    // Get the avatar of the user.
    const user = message.author;
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
        .setTitle('⚠️ Message Removed')
        .setThumbnail(avatarURL)
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
        const punishment = Number(optionPunishment.setting_punishment);

        // Execute the punishment.
        switch (punishment) {
            case 1:
                // Add +1 to the messages deleted statistic
                manageStatistics("messages_deleted");

                await message.delete();
                break;

            case 2:
                // 1 Hour hardcoded timeout, maybe add option for this in the future.
                await message.author.timeout(1 * 60 * 60 * 1000, "REDACTED: Hatespeech");
                break;

            case 3:
                // Add +1 to the messages deleted statistic
                manageStatistics("messages_deleted");

                await message.author.timeout(1 * 60 * 60 * 1000, "REDACTED: Hatespeech");
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