const Router = require('express').Router();
const DefaultRouter = require('./default.router');
const AuthRouter = require('./auth.router');

Router.use('/', DefaultRouter);
Router.use('/auth', AuthRouter);

module.exports = Router;
