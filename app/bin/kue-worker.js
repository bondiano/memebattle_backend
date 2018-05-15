require('module-alias/register');

const { queue: Queue, kue } = require('../bootstrap/kue');
const { tempUser } = require('@models');

Queue.on('error', err => {
    console.log( 'Kue worker error: ', err ); //eslint-disable-line
});

Queue.process('removeTempUserAfterDay', async ({data}, done) => {
    const user = await tempUser.findById(data.user.id);
    await user.destroy();
    done();
});

Queue.process('deferRemoveTempUser', ({data}, done) => {
    Queue.active((err, ids) => {
        ids.forEach((id) => {
            kue.Job.get(id, (_err, job) => {
                if (_err) {
                    console.error(err); //eslint-disable-line
                }
                if(job.data.user.id === data.user.id) {
                    job.remove();
                }
            });
        });
    });
    done();
});
