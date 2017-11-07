// Renaming and exporting all routes class:
const auth = require('./auth');
const service = require('./service');

module.exports = (app, db) => {
    auth(app, db);
    service(app, db);
    
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });
};