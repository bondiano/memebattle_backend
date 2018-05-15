const {
    tempUser$,
} = require('./listeners');

const {
    tempUser,
} = require('./subscribers');

const connection = (socket) => {
    tempUser$(socket).subscribe(tempUser);
};

module.exports = connection;
