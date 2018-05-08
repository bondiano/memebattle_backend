const { KUE_PORT, HOST } = require('../config/config');
const kueConfig = require('../config/kue');

const express = require('express');
const server = express();
const basicAuth = require('basic-auth-connect');
const { kue } = require('../bootstrap/kue');

server.use(basicAuth(kueConfig.ui.login, kueConfig.ui.password));
server.use(kue.app);

server.listen(KUE_PORT, HOST, () => {
    console.log(`KUE server listening on port ${KUE_PORT}!`);
});
