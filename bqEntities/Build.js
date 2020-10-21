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
                sql: () => `buildMinutes`
            },
            // sumBuildMinsByPack: {
            //     type: `sum`,
            //     sql: () => `buildMinutes`,
            //     filters: [
            //         { sql: () => `pack is not null` }
            //     ],
            //     // drillMembers: ({accountId, buildMinutes,}) => []
            //     // ['5cd1746617313f468d669013', ''
            // }
        };
    }

    get baseQueries() {
        return {
            'sumBuildMinsByPack': {
                "measures": [
                    `${this.tableName}.sumBuildMins`
                ],
                // "timeDimensions": [
                //     {
                //         "dimension": `${this.tableName}.day`,
                //         "granularity": "day",
                //         "dateRange": "Last month"
                //     }
                // ],
                "dimensions": [
                    `${this.tableName}.pack`
                ],
                "filters": [
                    {
                        "dimension": `${this.tableName}.pack`,
                        "operator": "set"
                    }
                ],
                "order": {}
            }
        }
    }
}


module.exports = new Build(buildSchema);
