const socket = require('socket.io');

const { fromEvent } = require('rxjs/observable/fromEvent');

let io;

/**
 * Used for connect socket to server
 * @param {ExpressListeningServer} server
 */
const connect = (server) => {
    if(!io) {
        return io = socket(server);
    }
    return io;
};

/**
 * Used for subscribe observer to connection stream
 * @param {Observer} observer
 */
const subscribe = (observer) => {
    const connection$ = fromEvent(io, 'connection');
    connection$.subscribe(observer);
};

module.exports = {
    connect,
    subscribe,
    io,
};
