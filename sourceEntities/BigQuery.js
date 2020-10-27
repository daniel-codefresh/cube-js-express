const BqDriver = require('@cubejs-backend/bigquery-driver');
const SourceEntity = require('./SourceEntity');
const { Account, Build, Concurrency } = require('../CubeEntities');
const constants = require('../cubeEntitiyNames');
const accountSchema = require('../bqSchemas/accountSchema');
const buildSchema = require('../bqSchemas/buildSchema');
const concurrencySchema = require('../bqSchemas/concurrencySchema');

const bqCubeEntities = {
    [constants.ACCOUNT]: new Account(accountSchema, constants.ACCOUNT),
    [constants.BUILD]: new Build(buildSchema, constants.BUILD),
    [constants.CONCURRENCY]: new Concurrency(concurrencySchema, constants.CONCURRENCY)
};

class BigQuery extends SourceEntity {
    constructor() {
        super(BqDriver, bqCubeEntities);
    }
}

module.exports = new BigQuery();
