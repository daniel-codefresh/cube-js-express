const BqEntity = require('./BqEntity');

class Concurrency extends BqEntity {
    get cubeSchema() {
        return {
            measures: this.measures,
            dimensions: this.dimensions,
            segments: this.segments,
            preAggregations: this.preAggregations,
        }
    }

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
                    `${this.entityName}.maxConcurrency`
                ],
                "order": {}
            },
            'concurrencyAllPacks': {
                "measures": [
                    `${this.entityName}.maxConcurrency`
                ],
                "dimensions": [
                    `${this.entityName}.packName`,
                ],
                "order": {}
            },
            'concurrencyInSmall': {
                "measures": [
                    `${this.entityName}.maxConcurrency`,
                    `${this.entityName}.availability`
                ],
                "segments": [
                    `${this.entityName}.smallPack`
                ],
            },
            'concurrencyInMedium': {
                "measures": [
                    `${this.entityName}.maxConcurrency`,
                    `${this.entityName}.availability`
                ],
                "segments": [
                    `${this.entityName}.mediumPack`
                ],
            },
            'concurrencyInLarge': {
                "measures": [
                    `${this.entityName}.maxConcurrency`,
                    `${this.entityName}.availability`
                ],
                "segments": [
                    `${this.entityName}.largePack`
                ],
            },
            'concurrencyInHybrid': {
                "measures": [
                    `${this.entityName}.maxConcurrency`,
                    `${this.entityName}.availability`
                ],
                "segments": [
                    `${this.entityName}.hybridPack`
                ],
            }
        }
    }

    get mainTimeDimension() {
        return `${this.entityName}.ts`;
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


module.exports = Concurrency;
