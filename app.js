/* Packages require section*/
require('dotenv').config({path: './config/.env'});
const express = require('express');
const morgen = require('morgan');
const pgdb = require('./db/pg-db');
const port = process.env.SERVER_PORT;

/* Middleware init section*/
const app = express();
const logger = morgen('combined');

/* Midlware use section */
app.use(logger);

GET('/users/create', () => pgdb.users.create());

// Generic GET handler;
function GET(url, handler) {
  app.get(url, (req, res) => {
      handler(req)
          .then(data => {
              res.json({
                  success: true,
                  data
              });
          })
          .catch(error => {
              res.json({
                  success: false,
                  error: error.message || error
              });
          });
  });
}

/* App section*/
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});