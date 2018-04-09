const Router = require('express').Router();
const DefaultRouter = require('./default.router');

Router.use('/', DefaultRouter);

module.exports = Router;