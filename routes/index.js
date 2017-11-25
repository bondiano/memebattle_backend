const auth = require('./auth');
const service = require('./service');
const game = require('./game');

module.exports = (app, db) => {

    auth(app, db);
    service(app, db);
    game(app, db);

    app.get('/', (req, res) => {
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
        <script>
            const socket = io();
            socket.on('CHOOSE_MEM', data => console.log('CHOOSE_MEM', JSON.parse(data)));
            socket.on('CONNECT_TO_GAME', data => console.log('CONNECT', JSON.parse(data)));
        </script>

        </body>
        </html>
        `);
    });

    /* Error handlers */

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

};
