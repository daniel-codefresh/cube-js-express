// asyncModule(async () => {
//     const source = require('../db');
//     const { entities } = source;
//
//     await Promise.all(entities.map(async entity => {
//         const { namespace, tableName, schema } = await entity.getSchema();
//         const dim = schema.map(column => {
//             const dimensionName = column.name;
//             return {
//                 [dimensionName]: {
//                     sql: () => `${dimensionName}`,
//                     type: `${source.typeDictionary[column.type]}`
//                 }
//             };
//         }).reduce((total, curr) => ({ ...total, ...curr }))
//         cube(tableName, {
//             sql: `select * from ${namespace}.${tableName} where ${USER_CONTEXT.id.filter('accountId')}`,
//             measures: entity.measures,
//             dimensions: dim
//         });
//     }));
// });
//
//
// // const { namespace, tableName, schema } = await require('../bqAccountSchema');
// // const schemas = await Promise.all([
// //     await require('../bqAccountSchema'),
// //     await require('../bqBuildSchema')
// // ])
//
// // const schemas = Promise.all(entities.map(entity => entity.getSchema()));
//
// // const bqTypesToCube = {
// //     'BOOL': 'boolean',
// //     'STRING': 'string',
// //     'NUMERIC': 'number',
// //     'TIMESTAMP': 'time'
// // };
//
// // schemas.forEach(({ namespace, tableName, schema }) => {
