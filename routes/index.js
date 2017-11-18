// Renaming and exporting all routes class:
const auth = require('./auth');
const service = require('./service');
const game = require('./game');

module.exports = (app, db) => {
    auth(app, db);
    service(app, db);
    game(app, db);

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
};