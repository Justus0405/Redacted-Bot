const sendErrorMessage = require('../sends/sendErrorMessage');

async function checkHierarchy(targetMember, botMember, permission) {

    const targetRolePosition = targetMember?.roles?.highest?.position ?? null;
    const botRolePosition = botMember?.roles?.highest?.position ?? null;

    // Check if target members role is above the bots role.
    if (targetRolePosition >= botRolePosition) {
        return false;
    }

    // Check if bot has the required permission.
    if (!botMember.permissions.has(permission)) {
        sendErrorMessage(`The bot doesn't have the needed permission: ${permission}`);
        return false;
    }

    // All checks passed.
    return true;
}

module.exports = checkHierarchy;