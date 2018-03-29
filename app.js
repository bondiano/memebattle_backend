require('dotenv').config({path: './.env'});
const { HTTP_PORT } = process.env;
const cors = require('cors');
const bodyParser = require('body-parser');
const Router = require('./routes');

/* Middleware init section */
const app = require('express')();
const server = require('http').createServer(app);

/* Middleware use section */
app.use(cors());
app.use(bodyParser.json());

/* Set up app routes */
app.use('/', Router);

server.listen(HTTP_PORT, () => {
    console.log(`App listening on port ${HTTP_PORT}!`);
});
