const { fromEvent } = require('rxjs/observable/fromEvent');

const user$ = (socket) =>
    fromEvent(socket, 'user');

module.exports = user$;
