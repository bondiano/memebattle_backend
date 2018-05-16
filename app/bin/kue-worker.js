require('module-alias/register');

const { queue: Queue, kue } = require('../bootstrap/kue');
const { tempUser: tempUserRepo } = require('@repo');
const { tempUser: tempUserJobs } = require('@jobs');

Queue.on('error', err => {
    console.log( 'Kue worker error: ', err ); //eslint-disable-line
});

Queue.process('removeTempUser', async ({data}, done) => {
    await tempUserRepo.destroyById(data.user.id);
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
                    tempUserJobs.RemoveTempUser(data.user);
                }
            });
        });
    });
    done();
});
