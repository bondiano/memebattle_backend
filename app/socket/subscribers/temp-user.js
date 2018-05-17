const { tempUserHandlers: handlers, errorHandler } = require('../handlers');
const { applyHandlers } = require('../utils');

const tempUserHandler = applyHandlers(handlers);

const observer = ({type, ...data}) => {
    if (data.error) {
        return errorHandler(data);
    }
    try {
        return tempUserHandler[type](data);
    } catch(err) {
        return errorHandler({...data, err});
    }
};

module.exports = observer;
