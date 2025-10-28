const sendModerationWarning = require('../libs/sendModerationWarning');
const sendModerationDone = require('../libs/sendModerationDone');
const sendDebugMessage = require('../libs/sendDebugMessage');
const checkHierarchy = require('../libs/checkHierarchy');
const sanitizeInput = require('../libs/sanitizeInput');
const checkToxicity = require('../libs/checkToxicity');
const manageState = require('../libs/manageState');
const getGuildSettings = require('../libs/getGuildSettings');

module.exports = (client) => {
    // Do something when a new message is written.

    client.on('messageCreate', async (message) => {

        // Skip when the model is not loaded yet.
        // TODO: Change for the agent rewrite.
        if (!manageState.classifier) {
            console.log('[  ] Classifier not loaded yet!')
            return
        }

        // Ignore bot messages.
        if (message.author.bot) return;

        // Check hierarchy and permissions when enabled.
        const optionHierarchy = await getGuildSettings(message.guild);

        if (optionHierarchy.hierarchy === true) {
            const ok = await checkHierarchy(message.member, message.guild.members.me, 'ManageMessages');
            if (!ok) return;
        }

        // Make the message all lowercase and sanitize Cyrillic and Greek characters.
        const sanitizedMessage = await sanitizeInput(message.content.toLowerCase());

        // Ignore messages containing whitelisted words.
        // TODO: Switch to database approach.
        const whitelist = ['freaking', 'crap', 'sucks', 'dare', 'cheater', 'wtf', 'fool', 'dumb', 'damn', 'damnit', 'dammit', 'shut', 'stupid', 'idiot', 'hell', 'fire', 'suck', 'fuck', 'fucking', 'shit', 'shitty', 'dumbass', 'hate', 'pussy', 'ass', 'gay', 'lesbian', 'homosexual', 'men', 'women'];

        // Regex that matches any whitelisted word.
        const regex = new RegExp(`\\b(${whitelist.join('|')})\\b`, 'gi');

        // Remove the whitelisted words from the message.
        const whitelistedContent = sanitizedMessage.replace(regex, '').replace(/\s+/g, ' ').trim();

        try {

            // check the toxic score of the cleaned message.
            const toxicScore = await checkToxicity(whitelistedContent);

            // Debug logging.
            // TODO: maybe remove this in the future because spyware.
            sendDebugMessage(`${message.author.globalName} [${toxicScore}]: ${message.content}`)

            // If toxic score is more than 70 but less than 90.
            if (toxicScore >= 70 && toxicScore < 90) {

                await sendModerationWarning(message, toxicScore);
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