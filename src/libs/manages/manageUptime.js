async function manageUptime() {

    // Function to format uptime into a readable string
    function formatUptime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours}h ${minutes}m ${secs}s`;
    }

    const raw_uptime = process.uptime();

    const uptime = formatUptime(raw_uptime);

    return uptime;
}

module.exports = manageUptime;