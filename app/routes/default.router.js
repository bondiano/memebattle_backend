const Router = require('express').Router();

Router.get('/', (req, res) => res.send('MEME BATTLE IS ALIVE!'));

module.exports = Router;
