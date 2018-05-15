const { tempUser: { CREATE } } = require('../types');

const { tempUser: handler } = require('../handlers');

const observer = ({type, ...data}) => {
    if (data.error) {
        return handler.errorHandler(data);
    }
    try {
        switch(type) {
        case(CREATE):
            return handler.createHandler(data);
        default:
            return handler.unknownHandler(data);
        }
    } catch(err) {
        handler.errorHandler({...data, err});
    }
};

module.exports = observer;
