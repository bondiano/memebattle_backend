const { queue: kueQueue } = require('../bootstrap/kue');
const { config: { TEMPUSER_EXPIRED } } = require('@config');

const RemoveTempUser = (user) => {
    const job = kueQueue.create('removeTempUserAfterDay', {user});
    job
        .delay(TEMPUSER_EXPIRED)
        .priority('high')
        .save(err => err && console.log('CREATE removeTempUser ERROR', err)); //eslint-disable-line
};

const DeferRemoveTempUser = (user) => {
    const job = kueQueue.create('deferRemoveTempUser', {user});
    job
        .priority('high')
        .save(err => err && console.log('CREATE deferRemoveTempUser ERROR', err)); //eslint-disable-line
};

module.exports = {
    RemoveTempUser,
    DeferRemoveTempUser,
};
