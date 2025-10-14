require('dotenv').config({ quiet: true });

async function sendDebugMessage(message) {

    if (String(process.env.SHOW_DEBUG).toLowerCase() === 'true' === true) {
        console.log(`[  ] ${message}`)
    }
}

module.exports = sendDebugMessage;