const { KUE_PORT, HOST, NODE_ENV } = require('../config/config');
const kueConfig = require('../config/kue');

const express = require('express');
const app = express();
const basicAuth = require('basic-auth-connect');
const { kue } = require('../bootstrap/kue');

app.use(basicAuth(kueConfig.ui.login, kueConfig.ui.password));

if(NODE_ENV !== 'production') {
    app.use(kue.app);
}

const server = app.listen(KUE_PORT, HOST, () => {
    console.log(`KUE server listening on port ${KUE_PORT}!`);
});

module.exports = {
    app,
    server
};
