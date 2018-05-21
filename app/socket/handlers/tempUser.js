const { tempUser: tempUserService } = require('@services');

const { errorHandler } = require('./');
const { handlerRegister } = require('../utils');
const { tempUser, TEMP_USER } = require('../types');

const createHandler = async ({data, socket}) => {
    try {
        const user = await tempUserService.createTempUser(data.identifier, socket.id);
        const res = {type: tempUser.CREATED, data: {'id': user.id, 'token': user.token}};

        socket.emit(TEMP_USER, res);
    } catch(err) {
        errorHandler({error: err, socket});
    }
};

const connectHandler = async ({data, socket}) => {
    try {
        const user = await tempUserService.updateUserSocketId(data.identifier, socket.id);
        const res = {type: tempUser.CONNECTED, data: {'id': user.id, 'token': user.token}};

        socket.emit(TEMP_USER, res);
    } catch(err) {
        errorHandler({error: err, socket});
    }
};

module.exports = [
    handlerRegister(tempUser.CREATE, createHandler),
    handlerRegister(tempUser.CONNECT, connectHandler),
];
