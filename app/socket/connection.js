const {
    disconnect$,
    tempUser$,
} = require('./listeners');

const {
    disconnect,
    tempUser,
} = require('./subscribers');

const connection = (socket) => {
    tempUser$(socket).subscribe(tempUser);
    disconnect$(socket).subscribe(disconnect);
};

module.exports = connection;
