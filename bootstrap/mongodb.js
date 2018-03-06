const mongoose = require('mongoose');
const {MONGO_DB_USERNAME, MONGO_DB_PASSWORD, MONGO_DB_URL} = process.env;

mongoose.connect(`mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_URL}`)

const db = mongoose.connection;

db.on('error', error => console.error('MONGO ERROR: ', error));
db.once('open', () => {
    console.log('CONNECTED');
});

module.exports = mongoose;