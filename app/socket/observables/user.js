const { fromEvent } = require('rxjs/observable/fromEvent');
const { map } = require('rxjs/operators');

const user$ = (socket) =>
    fromEvent(socket, 'user')
        .pipe(
            map((data) => ({data, socket}))
        );

module.exports = user$;
