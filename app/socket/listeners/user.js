const { fromEvent } = require('rxjs/observable/fromEvent');

const { USER } = require('../types');
const { extendWith } = require('../utils');
const { userConnect: validator } = require('../validators');

const user$ = (socket) =>
    fromEvent(socket, USER)
        .pipe(
            validator,
            extendWith({socket})
        );

module.exports = user$;
