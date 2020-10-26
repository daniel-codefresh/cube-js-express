module.exports = {
    namespace: 'etl',
    tableName: 'BuildsConcurrency_WithPackInfo',
    schema: [
        { name: 'accountId', type: 'STRING' },
        { name: 'ts', type: 'TIMESTAMP' },
        { name: 'usedConcurrency', type: 'NUMERIC' },
        { name: 'availableConcurrency', type: 'NUMERIC' },
        { name: 'packId', type: 'STRING' },
        { name: 'packName', type: 'STRING' },
    ]
};
