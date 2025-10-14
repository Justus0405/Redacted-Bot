const sendModerationDone = require('../libs/sendModerationDone');
const checkHierarchy = require('../libs/checkHierarchy');
const checkToxicity = require('../libs/checkToxicity')
const manageState = require('../libs/manageState');

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

        // Check hierarchy and permissions.
        const ok = await checkHierarchy(message.member, message.guild.members.me, 'ManageMessages');
        if (!ok) return;

        // Ignore messages containing whitelisted words.
        // TODO: Switch to database approach.
        const whitelist = ['sucks', 'dare', 'cheater', 'wtf', 'fool', 'dumb', 'damn', 'shut', 'stupid', 'idiot', 'hell', 'fire', 'suck', 'fuck', 'fucking', 'shit', 'shitty', 'dumbass', 'hate', 'pussy', 'ass', 'gay', 'lesbian', 'homosexual', 'men', 'women'];

        // Make the message to all lowercase.
        const content = message.content.toLowerCase();

        // Regex that matches any whitelisted word.
        const regex = new RegExp(`\\b(${whitelist.join('|')})\\b`, 'gi');

        // Remove the whitelisted words from the message.
        const cleanedContent = content.replace(regex, '').replace(/\s+/g, ' ').trim();

        try {

            // check the toxic score of the cleaned message.
            const toxicScore = await checkToxicity(cleanedContent);

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