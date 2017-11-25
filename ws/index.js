const handler = require('./handler');
const dispatcher = require('./dispatcher');

module.exports = (io) => {
    handler(io);
    dispatcher(io);
};
