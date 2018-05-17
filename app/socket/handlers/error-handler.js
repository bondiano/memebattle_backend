const { extractValidationType } = require('@utils');
const { ERROR } = require('../types');

const errorHandler = ({error, socket}) => {
    let errorResponse = {};
    
    const typeFields = extractValidationType(error);

    if(typeFields && typeFields.length > 0) {
        errorResponse = typeFields;
    }

    socket.emit(ERROR, errorResponse);
};

module.exports = errorHandler;
