const { config: { SOCKET_PORT, HOST } } = require('../config');
const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

const server = app.listen(SOCKET_PORT, HOST, () => {
    console.log(`Socket server listening on port ${SOCKET_PORT}!`);
});

const socket = require('../bootstrap/socket');
socket.connect(server);

const { connection } = require('../socket');
socket.subscribe(connection);

/* Create test route */
app.get('/', (req, res) => {
    res.send(`
    <html>
        <head>
        <title>Socket test route</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.dev.js"></script>
        </head>
        <body>
            <h1>Socket test route!</h1>
            <script>
            const socket = io('http://localhost:8000');
            </script>
        </body>
    </html>
    `);
});

module.exports = {
    app,
    server,
    socket
};
