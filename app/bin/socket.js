const { SOCKET_PORT, HOST } = require('../config/config');

const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

const server = app.listen(SOCKET_PORT, HOST, () => {
    console.log(`Socket server listening on port ${SOCKET_PORT}!`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('meow', {type: 'action'});

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
