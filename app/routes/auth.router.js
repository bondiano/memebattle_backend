const Router = require('express').Router();
const authController = require('../controllers/auth.controller');

Router.get('/provider/:provider', authController.socialNetwork);

module.exports = Router;
