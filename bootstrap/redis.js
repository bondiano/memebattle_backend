const Redis = require('ioredis');
const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_FAMILY,
    REDIS_PASSWORD,
    REDIS_DB
} = process.env;

const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    family: REDIS_FAMILY,
    password: REDIS_PASSWORD,
    db: REDIS_DB
});

module.exports = redis;