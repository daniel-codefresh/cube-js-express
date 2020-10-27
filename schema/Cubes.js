const sourceEntity = require('../sourceEntities');

Object.values(sourceEntity.cubeEntities).forEach(({ entityName, namespace, tableName, cubeSchema }) => {
    cube(entityName, {
        // sql: `select * from ${namespace}.${tableName}`,
        sql: `select * from ${namespace}.${tableName} where ${USER_CONTEXT.id.filter('accountId')}`,
        ...cubeSchema
    });
});
