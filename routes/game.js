const jwt_check = require('express-jwt');

/*
site/game/* route:
auth/modes GET
*/

const secret = new Buffer(process.env.JWT_KEY, 'base64');

module.exports = (app, db) => {
    // Get existed mods
    app.get('/game/modes', jwt_check({ secret: secret }), (req, res) => {
        db.gameModes.all().then(data  => {
            res.json(data);
        }).catch(error => {
            res.status(400).json({
                success: false,
                error: error.message || error
            });
        });
    });

    app.get('/games/liders', (req, res) => {
        db.users.getTop100().then(data  => {
            res.json(data);
        }).catch(error => {
            res.status(400).json({
                success: false,
                error: error.message || error
            });
        });
    });
};