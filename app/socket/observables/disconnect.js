const { fromEvent } = require('rxjs/observable/fromEvent');

const disconnect$ = (socket) =>
    fromEvent(socket, 'disconnect');

module.exports = disconnect$;
