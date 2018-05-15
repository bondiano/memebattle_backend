const { queue: kueQueue } = require('../bootstrap/kue');

const RemoveTempUserAfterDay = (user) => {
    const job = kueQueue.create('removeTempUserAfterDay', {user});
    const oneDay = 1000 * 60 * 60 * 24;
    job
        .delay(oneDay)
        .priority('high')
        .save(err => err && console.log('CREATE removeTempUserAfterDay ERROR', err)); //eslint-disable-line
};

const DeferRemoveTempUser = (user) => {
    const job = kueQueue.create('deferRemoveTempUser', {user});
    job
        .priority('high')
        .save(err => err && console.log('CREATE deferRemoveTempUser ERROR', err)); //eslint-disable-line
};

module.exports = {
    RemoveTempUserAfterDay,
    DeferRemoveTempUser,
};
