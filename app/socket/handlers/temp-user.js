const { tempUser: servise } = require('@services');

const { extractValidationType } = require('../utils');
const { tempUser, TEMP_USER, ERROR } = require('../types');

const createHandler = async ({identifier, socket}) => {
    try {
        const user = await servise.createTempUser(identifier, socket.id);
        const res = {type: tempUser.CREATED, data: {'user': user.id}};
        socket.emit(TEMP_USER, res);
    } catch(err) {
        console.error(err); //eslint-disable-line
    }
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
    unknownHandler,
    errorHandler,
};
