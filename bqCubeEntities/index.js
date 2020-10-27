const constants = require('../cubeEntitiyNames');
const accountSchema = require('../bqSchemas/accountSchema');
const buildSchema = require('../bqSchemas/buildSchema');
const concurrencySchema = require('../bqSchemas/concurrencySchema');
const Account = require('./Account');
const Build = require('./Build');
const Concurrency = require('./Concurrency');

const bqEntities = {
    [constants.ACCOUNT]: new Account(accountSchema, constants.ACCOUNT),
    [constants.BUILD]: new Build(buildSchema, constants.BUILD),
    [constants.CONCURRENCY]: new Concurrency(concurrencySchema, constants.CONCURRENCY)
}

module.exports = bqEntities;
