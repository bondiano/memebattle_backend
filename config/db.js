const config = require('./configs');

module.exports = {
    client: 'pg',
    connection: {
        host: config.DB_HOST,
        port: config.DB_PORT,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        charset: 'utf8'
    },
    debug: true,
};