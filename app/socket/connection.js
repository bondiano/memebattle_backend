const {
    disconnect$,
    user$
} = require('./listeners');

const {
    disconnect,
    user
} = require('./subscribers');

const connection = (socket) => {
    user$(socket).subscribe(user);
    disconnect$(socket).subscribe(disconnect);
};

module.exports = connection;
