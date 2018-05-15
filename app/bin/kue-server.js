require('module-alias/register');

/* Get kue config section */
const { config: { KUE_PORT, HOST, NODE_ENV }, kue: kueConfig } = require('../config');

const express = require('express');
const app = express();

/* Middleware init section */
const basicAuth = require('basic-auth-connect');

/* Kue bootstrap section */
const { kue } = require('../bootstrap/kue');

/* Middleware use section */
app.use(basicAuth(kueConfig.ui.login, kueConfig.ui.password));
if(NODE_ENV !== 'production') {
    app.use(kue.app);
}

/* Start server section */
const server = app.listen(KUE_PORT, HOST, () => {
    console.log(`KUE server listening on port ${KUE_PORT}!`); //eslint-disable-line
});

/* Export modules section (exmp. for tests) */
module.exports = {
    app,
    server,
};
