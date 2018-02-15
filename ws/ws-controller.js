const emitter = require('./emitter');

const disconnected = () => {
    console.log('DISCONNECT');
};

const onConnect = socket => {
    console.log('qwe')
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
    console.log('Socket ID:', socket.id);
    socket.on('action', data => console.log('QQQQQ', data));
    socket.on('msg', data => console.log('MSG', data));
    socket.on('disconnect', disconnected);
};

module.exports = io => {
    io.on('connection', onConnect)
};
