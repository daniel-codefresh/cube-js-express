const constants = require('../entities');

const bqEntities = {
    [constants.ACCOUNT]: require('./Account'),
    [constants.BUILD]: require('./Build'),
    [constants.CONCURRENCY]: require('./Concurrency')
}

Object.keys(bqEntities).forEach(key => {
    bqEntities[key].entityName = key;
})

module.exports = bqEntities;
