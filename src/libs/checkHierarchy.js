const sendErrorMessage = require('./sendErrorMessage');
const sendDebugMessage = require('./sendDebugMessage');

async function checkHierarchy(targetMember, botMember, permission) {

    const targetRolePosition = targetMember?.roles?.highest?.position ?? null;
    const botRolePosition = botMember?.roles?.highest?.position ?? null;

    sendDebugMessage(`Target Role Position: ${targetRolePosition} / Bot Role Position: ${botRolePosition}`);

    // Check if target members role is above the bots role.
    if (targetRolePosition >= botRolePosition) {
        sendDebugMessage('Target Role is above the Bot Role, Skipping...')
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