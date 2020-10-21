const BqDriver = require('@cubejs-backend/bigquery-driver');
const entities = require('../bqEntities');

class BigQuery {
    constructor() {
        this.Driver = BqDriver;
        this.entities = entities;
    }
}

module.exports = new BigQuery();
