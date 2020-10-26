const BqEntity = require('./BqEntity');
const concurrencySchema = require('../bqSchemas/concurrencySchema');

class Concurrency extends BqEntity {
    get measures() {
        return {
            maxConcurrency: {
                type: `max`,
                sql: () => `usedConcurrency`,
                // drillMembers: (accountId, concurrency, ts) => [accountId, concurrency, ts]
            },
            availability: {
                type: `max`,
                sql: () => `availableConcurrency`,
            }
        };
    }

    get segments() {
        return {
            smallPack: {
                sql: () => `packName = 'small'`
            },
            mediumPack: {
                sql: () => `packName = 'medium'`
            },
            largePack: {
                sql: () => `packName = 'large'`
            },
            hybridPack: {
                sql: () => `packName = 'hybrid'`
            }
        }
    }

    get baseQueries() {
        return {
            'maxConcurrency': {
                "measures": [
                    `${this.tableName}.maxConcurrency`
                ],
                "order": {}
            },
            'concurrencyAllPacks': {
                "measures": [
                    `${this.tableName}.maxConcurrency`
                ],
                "dimensions": [
                    `${this.tableName}.packName`,
                ],
                "order": {}
            },
            'concurrencyInSmall': {
                "measures": [
                    `${this.tableName}.maxConcurrency`,
                    `${this.tableName}.availability`
                ],
                "segments": [
                    `${this.tableName}.smallPack`
                ],
            },
            'concurrencyInMedium': {
                "measures": [
                    `${this.tableName}.maxConcurrency`,
                    `${this.tableName}.availability`
                ],
                "segments": [
                    `${this.tableName}.mediumPack`
                ],
            },
            'concurrencyInLarge': {
                "measures": [
                    `${this.tableName}.maxConcurrency`,
                    `${this.tableName}.availability`
                ],
                "segments": [
                    `${this.tableName}.largePack`
                ],
            },
            'concurrencyInHybrid': {
                "measures": [
                    `${this.tableName}.maxConcurrency`,
                    `${this.tableName}.availability`
                ],
                "segments": [
                    `${this.tableName}.hybridPack`
                ],
            }
        }
    }

    get timeDimension() {
        return `${this.tableName}.ts`;
    }

    get preAggregations() {
        return {
            concurrencyInSmall: {
                type: `rollup`,
                measureReferences: (maxConcurrency, availability) => [maxConcurrency, availability],
                dimensionReferences: () => [],
                segmentReferences: smallPack => [smallPack],
                timeDimensionReference: ts => ts,
                granularity: `day`,
                partitionGranularity: `month`
            },
            concurrencyInMedium: {
                type: `rollup`,
                measureReferences: (maxConcurrency, availability) => [maxConcurrency, availability],
                dimensionReferences: () => [],
                segmentReferences: mediumPack => [mediumPack],
                timeDimensionReference: ts => ts,
                granularity: `day`,
                partitionGranularity: `month`
            },
            concurrencyInLarge: {
                type: `rollup`,
                measureReferences: (maxConcurrency, availability) => [maxConcurrency, availability],
                dimensionReferences: () => [],
                segmentReferences: largePack => [largePack],
                timeDimensionReference: ts => ts,
                granularity: `day`,
                partitionGranularity: `month`
            },
            concurrencyInHybrid: {
                type: `rollup`,
                measureReferences: (maxConcurrency, availability) => [maxConcurrency, availability],
                dimensionReferences: () => [],
                segmentReferences: hybridPack => [hybridPack],
                timeDimensionReference: ts => ts,
                granularity: `day`,
                partitionGranularity: `month`
            }
        }
    }
}


module.exports = new Concurrency(concurrencySchema);
