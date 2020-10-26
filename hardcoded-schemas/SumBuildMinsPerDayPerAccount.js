cube(`SumBuildMinsPerDayPerAccount`, {
    sql: `SELECT * FROM etl.SumBuildMinsNormalised_PerDay_PerAccount`,

    measures: {
        count: {
            type: `count`,
        },
    },

    dimensions: {
        accountId: {
            sql: `${CUBE}.\`accountId\``,
            type: `string`
        },

        accountName: {
            sql: `${CUBE}.\`accountName\``,
            type: `string`
        },

        day: {
            sql: `${CUBE}.\`day\``,
            type: `time`
        },

        totalBuildMins: {
            sql: `${CUBE}.\`buildMinutes\``,
            type: `number`
        }
    }
});
