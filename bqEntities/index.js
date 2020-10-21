const constants = require('../entities');

const bqEntities = {
    [constants.ACCOUNT]: require('./Account'),
    [constants.BUILD]: require('./Build')
}

module.exports = bqEntities;
