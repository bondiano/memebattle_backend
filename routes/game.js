const jwt_check = require('express-jwt');

/*
site/game/* route:
auth/modes GET
game/rating POST
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

    app.post('/game/rating', (req, res) => {
            db.users.getUserWhithRating(req.body.id).then(dataUser =>
                db.users.getTop15().then(dataTop => {
                    res.json({dataUser, dataTop});
                })
                .catch(error => {
                    res.status(400).json({
                        success: false,
                        error: error.message || error
                    });
                }));
    });
};