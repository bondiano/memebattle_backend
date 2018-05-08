const kue = require('kue-scheduler');
const { port, host, password, family } = require('../config/redis');
const { db } = require('../config/kue');

const redis = {
    port, host, password, family, db
};

const queue = kue.createQueue({
    skipConfig: false,
    redis,
    restore: true
});

module.exports = {
    queue,
    kue
};
