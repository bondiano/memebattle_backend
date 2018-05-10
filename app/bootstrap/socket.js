const socket = require('socket.io');
const { fromEvent } = require('rxjs/observable/fromEvent');

let io;

const connect = (server) => {
    if(!io) {
        return io = socket(server);
    }
    return io;
};

const subscribe = (observer) => {
    const connection$ = fromEvent(io, 'connection');
    connection$.subscribe(observer);
};

module.exports = {
    connect,
    subscribe,
    io
};
