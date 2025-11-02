const manageSQLite = require('./manageSQLite');

async function manageStatistics(statistic) {

    manageSQLite.prepare(`
                UPDATE statistics
                SET ${statistic} = ${statistic} + 1
                WHERE id = 1
    `).run();

}

module.exports = manageStatistics;