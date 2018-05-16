const Joi = require('joi');

const validatorMiddleware = (schema) => (data, next) => {
    const {error, value} = Joi.validate(data, schema);
    if(error) {
        return next({...value, error});
    }
    return next(value);
};

module.exports = validatorMiddleware;
