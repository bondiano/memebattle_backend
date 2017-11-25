// Renaming and exporting all routes class:
const auth = require('./auth');
const service = require('./service');
const game = require('./game');

module.exports = (app, db) => {
    auth(app, db);
    service(app, db);
    game(app, db);


    /* Error handlers */

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};