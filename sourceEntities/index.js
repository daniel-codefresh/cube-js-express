const dbType = process.env.CUBEJS_DB_TYPE;

const ourDbs = {
    'bigquery': require('./BigQuery'),
    // 'postgres': require('./Postgres'),
};

module.exports = ourDbs[dbType];
