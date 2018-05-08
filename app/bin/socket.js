const { SOCKET_PORT, HOST } = require('../config/config');

const express = require('express');
const server = express();

const http = require('http').createServer(server);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(SOCKET_PORT, HOST, () => {
    console.log(`Socket server listening on port ${SOCKET_PORT}!`);
});

/* Create test route */
server.get('/', (req, res) => {
    res.send(`
    <html>
        <head>
        <title>Socket test route</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.dev.js"></script>
        </head>
        <body>
            <h1>Socket test route!</h1>
        </body>
    </html>
    `);
});
