const {
    disconnect$,
    user$
} = require('../observables');

const {
    disconnect,
    user
} = require('./');

const observer = (socket) => {
    console.log('Client connected');

    user$(socket).subscribe(user);
    disconnect$(socket).subscribe(disconnect);
};

module.exports = observer;
