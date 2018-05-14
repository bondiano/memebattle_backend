const kue = require('kue-scheduler');

const {
    redis: { port, host, password, family },
    kue: { db },
} = require('../config');

const redis = {
    port, host, password, family, db,
};

const queue = kue.createQueue({
    skipConfig: false,
    redis,
    restore: true,
});

module.exports = {
    queue,
    kue,
};
