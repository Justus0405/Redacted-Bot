// sends
const sendModerationWarning = require('../libs/sends/sendModerationWarning');
const sendModerationDone = require('../libs/sends/sendModerationDone');
// gets
const getGuildSetting = require('../libs/gets/getGuildSetting');
const getGuildSetup = require('../libs/gets/getGuildSetup');
// checks
const checkInputSanitization = require('../libs/checks/checkInputSanitization');
const checkHierarchy = require('../libs/checks/checkHierarchy');
const checkToxicity = require('../libs/checks/checkToxicity');
// manages
const manageStatistics = require('../libs/manages/manageStatistics');
const manageState = require('../libs/manages/manageState');

module.exports = (client) => {
    // Do something when a new message is written.

    client.on('messageCreate', async (message) => {

        // Skip when the model is not loaded yet.
        // TODO: Change for the agent rewrite.
        if (!manageState.classifier) {
            console.log('[  ] Classifier not loaded yet!');
            return
        }

        // Ignore bot messages.
        if (message.author.bot) return;

        // Ignore the message when the server did not complete the setup.
        const setup = await getGuildSetup(message.guild);
        if (!setup) return;

        // Check hierarchy and permissions when enabled.
        // TODO:
        // optionHierarchy.setting_hierarchy seriously?
        // I need to come up with a better naming convention...
        const optionHierarchy = await getGuildSetting(message.guild, "setting_hierarchy");

        if (optionHierarchy.setting_hierarchy != 0) {
            const ok = await checkHierarchy(message.member, message.guild.members.me, 'ManageMessages');
            if (!ok) return;
        }

        // Make the message all lowercase and sanitize Cyrillic and Greek characters.
        const sanitizedMessage = await checkInputSanitization(message.content.toLowerCase());

        // Ignore messages containing whitelisted words.
        // TODO: Switch to database approach.
        const whitelist = ['crazy', 'assailant', 'criminal', 'freaking', 'crap', 'sucks', 'dare', 'cheater', 'wtf', 'fool', 'dumb', 'damn', 'damnit', 'dammit', 'god', 'allah', 'shut', 'stupid', 'idiot', 'hell', 'fire', 'suck', 'fuck', 'fucking', 'shit', 'shitty', 'dumbass', 'hate', 'pussy', 'ass', 'gay', 'lesbian', 'homosexual', 'men', 'women', 'female', 'male'];

        // Regex that matches any whitelisted word.
        const regex = new RegExp(`\\b(${whitelist.join('|')})\\b`, 'gi');

        // Remove the whitelisted words from the message.
        const whitelistedContent = sanitizedMessage.replace(regex, '').replace(/\s+/g, ' ').trim();

        try {

            // check the toxic score of the cleaned message.
            const toxicScore = await checkToxicity(whitelistedContent);

            // Add +1 to the messages scanned statistic
            manageStatistics("messages_scanned");

            // If toxic score is more than 70 but less than 90.
            if (toxicScore >= 70 && toxicScore < 90) {

                // Send warning if enabled for the server.
                const optionWarnings = await getGuildSetting(message.guild, "setting_warnings");

                if (optionWarnings.setting_warnings != 0) {
                    await sendModerationWarning(message, toxicScore);
                }

            }

            // If toxic score is more or equal to 90.
            if (toxicScore >= 90) {

                await sendModerationDone(message, toxicScore);
            }

        } catch (error) {
            // In case something goes wrong lmao.
            console.error(error);
        }
    });
};