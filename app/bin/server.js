require('dotenv').config();

const { HTTP_PORT } = require('../config/config');

const express = require('express');
const server = express();

/* Middleware init section */
const cors = require('cors');
const bodyParser = require('body-parser');
const { customResponses } = require('../middlewares');

/* Middleware use section */
server.use(cors());
server.use(bodyParser.json());
server.use(customResponses);

/* Init router */
const Router = require('../routes');

/* Set up server routes */
server.use('/', Router);

server.listen(HTTP_PORT, () => {
    console.log(`App listening on port ${HTTP_PORT}!`);
});
