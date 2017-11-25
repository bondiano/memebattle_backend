require('dotenv').config({path: '../config/.env'});
const Redis = require('ioredis');

const conf = {
    port: process.env.REDIS_PORT,          // Redis port
    host: process.env.REDIS_HOST,   // Redis host
    family: process.env.REDIS_FAMILY,           // 4 (IPv4) or 6 (IPv6)
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB
};

const redis = new Redis(conf);

const redisFabric = () => {
    return {
        newRedis: new Redis(conf),
        redis
    }
};

module.exports = redisFabric;
