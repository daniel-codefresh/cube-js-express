const BqEntity = require('./BqEntity');

class Build extends BqEntity {
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
                    `${this.entityName}.sumBuildMins`
                ],
                "dimensions": [
                    `${this.entityName}.packName`
                ],
                "segments": [
                    `${this.entityName}.packNotEmpty`
                ],
                "order": {}
            }
        }
    }

    get mainTimeDimension() {
        return `${this.entityName}.day`;
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


module.exports = Build;
