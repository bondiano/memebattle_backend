// Renaming and exporting all routes class:
const auth = require('./auth');

module.exports = (app, db) => {
    auth(app, db);
    app.get('/', function (req, res) {
        res.send('Hello World!');
      });

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
    GET('/users/create', () => db.users.create());
    GET('/users/drop', () => db.users.drop());
};