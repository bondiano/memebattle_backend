require('dotenv').config({path: './config/.env'});
const {HTTP_PORT: port} = process.env;

const cors = require('cors');
const pgdb = require('./db/pg-db');
const bodyParser = require('body-parser');



/* Middleware init section */
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {path: '/socket.io', transports: ['websockets', 'polling'], secure: true});

/* Middleware use section */
app.use(cors());
app.use(bodyParser.json());

/* Set up app routes */
require('./routes')(app, pgdb);
require('./ws')(io);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
