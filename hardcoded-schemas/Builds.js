cube(`Builds`, {
    sql: `SELECT * FROM Builds`,

    measures: {
        count: {
            type: `count`,
        },
        sumBuildMins: {
            type: `sum`,
            sql: `buildMinutes`,
        }
    },

    dimensions: {
        accountId: {
            sql: `accountId`,
            type: `string`
        },
        buildMins: {
            sql: `buildMins`,
            type: `number`
        },
        ts: {
            sql: `ts`,
            type: `time`
        },
        day: {
            sql: `ts`,
            type: `time`
        },
        packName: {
            sql: `packName`,
            type: `string`
        },
    },

    segments: {
        packNotEmpty: {
            sql: `pack is not null`
        },
    },

    preAggregations: {
        sumBuildMinsAllPacks: {
            type: `rollup`,
            measureReferences: [sumBuildMins],
            dimensionReferences: [packName],
            segmentReferences: [packNotEmpty],
            timeDimensionReference: day,
            granularity: `day`,
            partitionGranularity: `month`,
        },
    }
});


const query = {
    "measures": [
        "Builds.sumBuildMins"
    ],
    "dimensions": [
        "Builds.packName"
    ],
    "segments": [
        "Builds.packNotEmpty"
    ],
    "order": {},
    "timeDimensions": [
        {
            "dimension": "Builds.day",
            "dateRange": "last month",
            "granularity": "day"
        }
    ]
}
