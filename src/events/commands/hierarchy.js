const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const manageSQLite = require('../../libs/manageSQLite');

async function hierarchy(interaction) {

    const option = interaction.options.getBoolean('option');

    // Database code
    // TODO: Figure out code for this lmao.

    sendSuccessMessage(interaction, `Successfully changed hierarchy to ${option}`);
}

module.exports = hierarchy;