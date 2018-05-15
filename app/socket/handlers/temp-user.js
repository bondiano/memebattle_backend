const { tempUser: servise } = require('@services');

const { extractValidationType } = require('../utils');
const { tempUser, TEMP_USER, ERROR } = require('../types');

const createHandler = async ({data, socket}) => {
    try {
        const user = await servise.createTempUser(data.identifier, socket.id);
        const res = {type: tempUser.CREATED, data: {'id': user.id, 'token': user.token}};
        socket.emit(TEMP_USER, res);
    } catch(err) {
        errorHandler({error: err, socket});
    }
};

const connectHandler = async () => {
};

const errorHandler = ({error, socket}) => {
    let errorResponse = {};
    const typeFields = extractValidationType(error.errors || error);

    if(typeFields.length > 0) {
        errorResponse = typeFields;
    }
    socket.emit(ERROR, errorResponse);
};

const unknownHandler = ({socket}) => {
    socket.emit(TEMP_USER, {type: tempUser.UNKNOWN});
};

module.exports = {
    createHandler,
    connectHandler,
    unknownHandler,
    errorHandler,
};
