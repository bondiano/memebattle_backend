/* Config load section */
require('dotenv').config({path: './config/.env'});
const port = process.env.SERVER_PORT;

// for dev .env row with IS_PRODUCTION must be empty
if(process.env.IS_PRODUCTION){
  process.env.NODE_ENV = 'production';
}

/* Packages require section */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pgdb = require('./db/pg-db');
const bodyParser = require('body-parser');

/* Middleware init section */
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {path: '/socket.io', transports: ['websockets', 'polling'], secure: true});
const logger = morgan('combined');
const redis = require('./redis')();

/* Middleware use section */
app.use(cors());
app.use(logger);
app.use(require('express-promise')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Set up app routes */
require('./routes')(app, pgdb);
require('./ws')(io);

/* Start unlimited battle */
require('./ws/game-rules')(1, 0).gameloop();

module.exports = {
    server,
    port,
}
