const globalConfig = require('./configs');

const adapter = 'pg';

module.exports = {
    client: adapter,
    connection: {
        host: globalConfig.DB_HOST,
        port: globalConfig.DB_PORT,
        user: globalConfig.DB_USER,
        password: globalConfig.DB_PASSWORD,
        database: globalConfig.DB_NAME,
        charset: 'utf8'
    },
    debug: true,
};