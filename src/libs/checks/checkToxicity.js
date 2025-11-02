const state = require('../manages/manageState');

async function checkToxicity(text) {

        // Model Response.
        const response = await state.classifier(text);

        // Value conversion.
        //const result = response.map(r => `${r.label}: ${(r.score * 100).toFixed(2)}%`).join('\n');
        const result = response.map((r) => Math.round(r.score * 100));

        // Return value as an int.
        return result;
}

module.exports = checkToxicity;
