const { tempUser: { CREATE }, ERROR } = require('../types');

const { tempUser: action } = require('../actions');

const observer = ({socket, error, type, ...data}) => {
    if (error) {
        socket.emit(ERROR, JSON.stringify({error: {message: error.message}}));
        return;
    }

    switch(type) {
    case(CREATE):
        return action.create(data);
    default:
        return action.unknown(data);
    }
};

module.exports = observer;
