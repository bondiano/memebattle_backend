const {tempUser: servise} = require('@services/');

const { tempUser, USER } = require('../types');

const create = async ({identifier, socket}) => {
    try {
        const user = await servise.createTempUser(identifier, socket.id);
        const res = {type: tempUser.CREATED, data: {'user': user.id}};
        socket.emit(USER, JSON.stringify(res));
    } catch(err) {
        console.error(err); //eslint-disable-line
    }
};

const unknown = ({socket}) => {
    socket.emit(USER, {type: tempUser.UNKNOWN});
};

module.exports = {
    create,
    unknown,
};
