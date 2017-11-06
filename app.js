/* Config load section */
require('dotenv').config({path: './config/.env'});
const port = process.env.SERVER_PORT;

/* Packages require section */
const express = require('express');
const morgen = require('morgan');
const pgdb = require('./db/pg-db');

/* Middleware init section */
const app = express();
const logger = morgen('combined');

/* Midlware use section */
app.use(logger);

/* Set up app routers */ 
require('./routes')(app, pgdb);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});