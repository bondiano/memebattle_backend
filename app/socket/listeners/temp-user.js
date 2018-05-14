const { fromEvent } = require('rxjs/observable/fromEvent');

const { TEMP_USER } = require('../types');
const { extendWith } = require('../utils');
const { userConnect: validator } = require('../validators');

const tempUser$ = (socket) =>
    fromEvent(socket, TEMP_USER)
        .pipe(
            validator,
            extendWith({socket})
        );

module.exports = tempUser$;
