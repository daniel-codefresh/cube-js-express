class BqEntity {
    constructor({namespace, tableName, schema}, entityName) {
        this.tableName = tableName;
        this.namespace = namespace;
        this.schema = schema;
        this.entityName = entityName;
    }

    get typeDictionary() {
        return {
            'BOOL': 'boolean',
            'STRING': 'string',
            'NUMERIC': 'number',
            'TIMESTAMP': 'time'
        };
    }

    get dimensions() {
        return this.schema.map(column => {
            const dimensionName = column.name;
            return {
                [dimensionName]: {
                    sql: () => `${dimensionName}`,
                    type: `${this.typeDictionary[column.type]}`
                }
            };
        }).reduce((total, curr) => ({ ...total, ...curr }));
    }
}

module.exports = BqEntity;
