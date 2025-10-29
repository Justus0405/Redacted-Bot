const { ActivityType } = require('discord.js');
const sendDebugMessage = require('../libs/sendDebugMessage');

// TODO: Remove this in favour of the database.
const manageState = require('../libs/manageState');

// TODO: Make the agent a seperate project and communicate via API.
const { pipeline } = require('@xenova/transformers');

module.exports = (client) => {
    // This function runs code once the bot is ready.

    client.once('clientReady', async () => {
        console.log(`[  ] ${client.user.tag} is online!`);

        // MODEL: https://huggingface.co/models?library=transformers.js&sort=trending&search=toxic
        // Available models are limited because of explicit Transformers.js support...
        console.log('[  ] Loading model...');
        manageState.classifier = await pipeline('text-classification', 'Xenova/toxic-bert');
        console.log('[  ] Model loaded!');

        // Set Presence.
        const updatePresence = () => {
            client.user.setPresence({
                activities: [{ name: `Moderating ${client.guilds.cache.size} Servers!`, type: ActivityType.Custom }],
                status: 'online',
            });
        }

        // Inital Presence.
        updatePresence();

        // Dynamically update when the bot is added/removed from a guild.
        client.on('guildCreate', updatePresence);
        client.on('guildDelete', updatePresence);

        // Update Presence every 1 minute.
        // This is needed because otherwise the status randomly gets blank idk.
        const sendPresenceInterval = setInterval(() => {
            sendDebugMessage('Updating Presence...');
            updatePresence();
        }, 60000);
    });
};