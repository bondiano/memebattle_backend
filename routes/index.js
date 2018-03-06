const auth = require('./auth');
const game = require('./game');

module.exports = (app, db) => {

    auth(app, db);
    game(app, db);

    app.get('/', (req, res) => {
        // language=HTML
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
        <script>
            const socket = io.connect('http://localhost:3080');
            console.log('START');
            socket.on('connection', () => console.log('success'));
            socket.on('action', data => console.log('action', data));
            socket.on('error', e => console.log('Error: ' + (e ? e : 'unknown error')));
            socket.on('news', function (data) {
                console.log(data);
                socket.emit('my other event', {my: 'data'});
            });
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

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                success: false,
                name: 'LOGINERR',
                message: "Auth error",
                error: err.name,
            });
        }
    });
};
