const Redis = require('ioredis');
const redisConfig = require('../config/redis');

const redis = new Redis({
    port: redisConfig.port,
    host: redisConfig.host
});

module.exports = redis;
