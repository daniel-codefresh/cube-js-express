const BqEntity = require('./BqEntity');
const buildSchema = require('../bqSchemas/buildSchema');

class Build extends BqEntity {
    get measures() {
        return {
            count: {
                type: `count`,
            },
            sumBuildMins: {
                type: `sum`,
                sql: () => `buildMinutes`,
                // drillMembers: (accountId, buildMinutes, day) => [accountId, buildMinutes, day]
            },
        };
    }

    get baseQueries() {
        return {
            'sumBuildMinsAllPacks': {
                "measures": [
                    `${this.tableName}.sumBuildMins`
                ],
                "dimensions": [
                    `${this.tableName}.packName`
                ],
                "segments": [
                    `${this.tableName}.packNotEmpty`
                ],
                "order": {}
            }
        }
    }

    get timeDimension() {
        return `${this.tableName}.day`;
    }

    get segments() {
        return {
            packNotEmpty: {
                sql: () => `pack is not null`
            },
        }
    }

    get preAggregations() {
        return {
            sumBuildMinsAllPacks: {
                type: `rollup`,
                measureReferences: sumBuildMins => [sumBuildMins],
                dimensionReferences: packName => [packName],
                segmentReferences: packNotEmpty => [packNotEmpty],
                timeDimensionReference: day => day,
                granularity: `day`,
                // partitionGranularity: `month`,
                // refreshKey: {
                //     sql: `SELECT MAX(created_at) FROM orders`
                // }
            },
        }
    }
}


module.exports = new Build(buildSchema);
