const { user: {CREATED}} = require('../types');

const observer = ({data, socket}) => {
    console.log(data);
    const res = {type: CREATED, data: {'user': socket.id}};
    socket.emit('user', JSON.stringify(res));
};

module.exports = observer;
