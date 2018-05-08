const kue = require('kue-scheduler');
const redis = require('../config/redis');

const queue = kue.createQueue({
    skipConfig: false,
    redis,
    restore: true
});

module.exports = {
    queue,
    kue
};
