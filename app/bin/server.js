require('module-alias/register');

const { config: { REST_PORT, HOST } } = require('@config');

const express = require('express');
const app = express();

/* Middleware init section */
const cors = require('cors');
const bodyParser = require('body-parser');
const { customResponses } = require('../middlewares');

/* Middleware use section */
app.use(cors());
app.use(bodyParser.json());
app.use(customResponses);

/* Init router */
const Router = require('../routes');

/* Set up server routes */
app.use('/', Router);

const server = app.listen(REST_PORT, HOST, () => {
    console.log(`REST server listening on port ${REST_PORT}!`); //eslint-disable-line
});

module.exports = {
    app,
    server,
};
