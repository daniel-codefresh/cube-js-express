const BqEntity = require('./BqEntity');
const accountSchema = require('../bqSchemas/accountSchema');

class Account extends BqEntity {
    get measures() {
        return {
            count: {
                type: `countDistinct`,
                sql: () => `accountId`
            },
            countEnterpriseAccounts: {
                type: `count`,
                sql: () => `segment`,
                filters: [
                    { sql: () => `segment = "ENTERPRISE"` }
                ],
                // drillMembers: () => [`name`]
            },
        };
    }

}

module.exports = new Account(accountSchema);
