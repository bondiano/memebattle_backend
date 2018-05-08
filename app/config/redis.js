require('dotenv').config();

module.exports = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    family: process.env.REDIS_FAMILY,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB
};
