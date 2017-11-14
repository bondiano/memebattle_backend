/* Config load section */
require('dotenv').config({path: './config/.env'});
const port = process.env.SERVER_PORT;

// for dev .env row with IS_PRODUCTION must be empty
if(process.env.IS_PRODUCTION){
  process.env.NODE_ENV = 'production';
}

/* Packages require section */
const express = require('express');
const morgan = require('morgan');
const pgdb = require('./db/pg-db');
const bodyParser = require('body-parser');
var cors = require('cors')

/* Middleware init section */
const app = express();
const logger = morgan('combined');

/* Midlware use section */
app.use(logger);
app.use(require('express-promise')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Set up app routes */ 
require('./routes')(app, pgdb);

/* Error handlers */

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* App section */
app.use(cors());

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});