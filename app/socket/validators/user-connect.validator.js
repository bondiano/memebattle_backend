const Joi = require('joi');

const { validator } = require('../utils');

const userConnectSchema = {
    data: Joi.object({
        identifier: Joi.string().required(),
    }),
    type: Joi.string().required(),
};

const userConnect = validator(userConnectSchema);

module.exports = userConnect;
