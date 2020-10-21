cube(`BuildMinsMaxConsumption`, {
  sql: `SELECT * FROM etl.\`BuildMins_MaxConsumption\` where ${USER_CONTEXT.id} = accountId`,

  joins: {

  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [accountId, accountName, buildId, hybrid]
    },
    sumBuildMins: {
      type: `sum`,
      sql: `buildMinutes`,
      // filters: [
      //   { sql: `${CUBE}.accountName = "hippo-inc"` }
      // ]
    }
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

    isCodefreshAccount: {
      sql: `${CUBE}.\`isCodefreshAccount\``,
      type: `string`
    },

    launchCompositionRuntime: {
      sql: `${CUBE}.\`launchCompositionRuntime\``,
      type: `string`
    },

    segment: {
      sql: `segment`,
      type: `string`
    },

    isSuspended: {
      sql: `${CUBE}.\`isSuspended\``,
      type: `string`
    },

    hasStash: {
      sql: `${CUBE}.\`hasStash\``,
      type: `string`
    },

    hasGithub: {
      sql: `${CUBE}.\`hasGithub\``,
      type: `string`
    },

    hasGitlab: {
      sql: `${CUBE}.\`hasGitlab\``,
      type: `string`
    },

    hasAks: {
      sql: `${CUBE}.\`hasAks\``,
      type: `string`
    },

    hasGcloud: {
      sql: `${CUBE}.\`hasGcloud\``,
      type: `string`
    },

    hasDigitalOcean: {
      sql: `${CUBE}.\`hasDigitalOcean\``,
      type: `string`
    },

    paymentPlanId: {
      sql: `${CUBE}.\`paymentPlanId\``,
      type: `string`
    },

    paymentPlanTrialActive: {
      sql: `${CUBE}.\`paymentPlanTrialActive\``,
      type: `string`
    },

    paymentPlanTrialType: {
      sql: `${CUBE}.\`paymentPlanTrialType\``,
      type: `string`
    },

    paymentPlanIsWiredTransfer: {
      sql: `${CUBE}.\`paymentPlanIsWiredTransfer\``,
      type: `string`
    },

    paymentPlanProvider: {
      sql: `${CUBE}.\`paymentPlanProvider\``,
      type: `string`
    },

    dedicatedInfrastructure: {
      sql: `${CUBE}.\`dedicatedInfrastructure\``,
      type: `string`
    },

    supportPlan: {
      sql: `${CUBE}.\`supportPlan\``,
      type: `string`
    },

    increasedAttention: {
      sql: `${CUBE}.\`increasedAttention\``,
      type: `string`
    },

    buildId: {
      sql: `${CUBE}.\`buildId\``,
      type: `string`
    },

    status: {
      sql: `status`,
      type: `string`
    },

    configType: {
      sql: `${CUBE}.\`configType\``,
      type: `string`
    },

    hybrid: {
      sql: `hybrid`,
      type: `string`
    },

    accountUpdatedAt: {
      sql: `${CUBE}.\`accountUpdatedAt\``,
      type: `time`
    },

    accountCreationTime: {
      sql: `${CUBE}.\`accountCreationTime\``,
      type: `time`
    },

    paymentPlanTrialStart: {
      sql: `${CUBE}.\`paymentPlanTrialStart\``,
      type: `time`
    },

    paymentPlanTrialEnd: {
      sql: `${CUBE}.\`paymentPlanTrialEnd\``,
      type: `time`
    },

    buildRequestTime: {
      sql: `${CUBE}.\`buildRequestTime\``,
      type: `time`
    },

    buildDay: {
      sql: `${CUBE}.\`buildDay\``,
      type: `time`
    },

    buildMinutes: {
      sql: `${CUBE}.\`buildMinutes\``,
      type: `number`
    }
  }
});
