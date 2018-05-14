const Redis = require('ioredis');
const { redis: redisConfig } = require('../config');

const redis = new Redis({
    port: redisConfig.port,
    host: redisConfig.host,
});

module.exports = redis;
