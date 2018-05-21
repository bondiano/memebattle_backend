const Router = require('express').Router();
const { auth: authController } = require('@controllers');

Router.get('/provider/:provider', authController.socialNetwork);

module.exports = Router;
