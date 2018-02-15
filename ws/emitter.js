const {REDIS_HOST, REDIS_PORT} = process.env;
const io = require('socket.io-emitter')({ host: REDIS_HOST, port: REDIS_PORT });

module.exports = io;
