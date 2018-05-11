const {
    disconnect$,
    user$
} = require('./observables');

const {
    disconnect,
    user
} = require('./observers');

const connection = (socket) => {
    console.log('Client connected');

    user$(socket).subscribe(user);
    disconnect$(socket).subscribe(disconnect);
};

module.exports = connection;
