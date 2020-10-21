const source = require('../db');
const { entities } = source;

Object.values(entities).forEach(({ namespace, tableName, measures, dimensions }) => {
    cube(tableName, {
        sql: `select * from ${namespace}.${tableName} where ${USER_CONTEXT.id.filter('accountId')}`,
        measures,
        dimensions,
    });
});
