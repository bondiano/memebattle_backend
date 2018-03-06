require('dotenv').config({path: './config/.env'});
const {
    HTTP_PORT: port,
    REDIS_HOST,
    REDIS_PORT
} = process.env;

const cors = require('cors');
const pgdb = require('./db/pg-db');
const bodyParser = require('body-parser');


/* Middleware init section */
const app = require('express')();
const server = require('http').createServer(app);
const redisSocketIoAdapter = require('socket.io-redis');
const io = require('socket.io')(server);


/* Middleware use section */
app.use(cors());
app.use(bodyParser.json());
io.adapter(redisSocketIoAdapter({host: REDIS_HOST, port: REDIS_PORT}));

/* Set up app routes */
require('./routes')(app, pgdb);
require('./ws/ws-controller')(io);

server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
