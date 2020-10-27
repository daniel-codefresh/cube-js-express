const SourceEntity = require('./SourceEntity');
const BqDriver = require('@cubejs-backend/bigquery-driver');
const cubeEntities = require('../bqCubeEntities');

class BigQuery extends SourceEntity {
    constructor() {
        super(BqDriver, cubeEntities);
    }
}

module.exports = new BigQuery();
