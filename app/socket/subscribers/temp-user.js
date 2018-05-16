const { tempUserHandlers: handlers, errorHandler } = require('../handlers');
const { applyHandlers } = require('../utils');

const tempUserHandler = applyHandlers(handlers);

const observer = ({type, ...data}) => {
    if (data.error) {
        return errorHandler(data);
    }
    try {
        tempUserHandler[type](data);
    } catch(err) {
        errorHandler({...data, err});
    }
};

module.exports = observer;
