const BqDriver = require('@cubejs-backend/bigquery-driver');
const cubeEntities = require('../bqCubeEntities');

class BigQuery {
    constructor() {
        this.Driver = BqDriver;
        this.cubeEntities = cubeEntities;
    }

    get supportedQueries() {
        return Object.values(this.cubeEntities).map(entity => {
            const { entityName } = entity;
            const supportedQueryNames = Object.keys(entity.baseQueries || {});
            const res = {};
            supportedQueryNames.forEach(queryName => {
                res[queryName] = { entityName }
            });
            return res;
        }).reduce((p, c) => ({...p, ...c}));
    }

    mapQueryToCubeQuery({ queryName, dateRange, granularity }) {
        const query = this.supportedQueries[queryName];
        if (!query) throw new Error('Invalid query name');

        const entity = this.cubeEntities[query.entityName];
        const baseQuery = entity.baseQueries[queryName];
        return {
            query: {
                ...baseQuery,
                timeDimensions: [{
                    dimension: entity.timeDimension,
                    dateRange,
                    granularity
                }],
                // filters: [{
                //     member: `${entity.tableName}.accountId`,
                //     operator: 'equals',
                //     values: [authenticatedEntityId]
                // }]
            },
            queryType: 'multi',
            cubeName: entity.tableName
        };
    }
}

module.exports = new BigQuery();
