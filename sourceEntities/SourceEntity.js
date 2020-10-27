class SourceEntity {
    constructor(Driver, cubeEntities) {
        this.Driver = Driver;
        this.cubeEntities = cubeEntities;
        this.supportedQueries = this.getAllSupportedQueries(cubeEntities);
    }

    getAllSupportedQueries(cubeEntities = {}) {
        return Object.values(cubeEntities).map(entity => {
            const supportedQueryNames = Object.keys(entity.baseQueries || {});
            const supportedQueriesPerEntity = {};
            supportedQueryNames.forEach(queryName => {
                const { entityName, baseQueries, mainTimeDimension } = entity;
                supportedQueriesPerEntity[queryName] = {
                    entityName,
                    mainTimeDimension,
                    baseQuery: baseQueries[queryName],
                }
            });
            return supportedQueriesPerEntity;
        }).reduce((prev = {}, current = {}) => ({ ...prev, ...current }));
    }

    mapQueryToCubeQuery({ queryName, dateRange, granularity }) {
        const targetQuery = this.supportedQueries[queryName];
        if (!targetQuery) throw new Error('Invalid query name');

        const { baseQuery, mainTimeDimension, entityName } = targetQuery;
        return {
            query: {
                ...baseQuery,
                timeDimensions: [{
                    dimension: mainTimeDimension,
                    dateRange,
                    granularity
                }],
            },
            queryType: 'multi',
            cubeName: entityName
        };
    }
}

module.exports = SourceEntity;
