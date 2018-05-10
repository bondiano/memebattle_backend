const { io } = require('../bootstrap/socket');
const connection = require('./observers/connection');

module.exports = {
    io,
    connection
};
