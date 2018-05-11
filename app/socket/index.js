const { io } = require('../bootstrap/socket');
const { connection } = require('./observers');

module.exports = {
    io,
    connection
};
