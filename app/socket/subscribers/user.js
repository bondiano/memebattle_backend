const { user: {CREATED}, USER } = require('../types');

const observer = ({data, socket, error}) => {
    if (error) {
        return;
    }
    const res = {type: CREATED, data: {'user': socket.id, data}};
    socket.emit(USER, JSON.stringify(res));
};

module.exports = observer;
