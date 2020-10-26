const sourceEntity = require('../sourceEntities');

Object.values(sourceEntity.cubeEntities).forEach(({ namespace, tableName, measures, dimensions, segments, preAggregations }) => {
    cube(tableName, {
        // sql: `select * from ${namespace}.${tableName}`,
        sql: `select * from ${namespace}.${tableName} where ${USER_CONTEXT.id.filter('accountId')}`,
        measures,
        dimensions,
        segments,
        preAggregations
    });
});
