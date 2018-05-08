const { REST_PORT, HOST } = require('../config/config');

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

server.listen(REST_PORT, HOST, () => {
    console.log(`REST server listening on port ${REST_PORT}!`);
});
