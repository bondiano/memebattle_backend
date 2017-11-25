const jwt_check = require('express-jwt');
const redis = require('../redis')().redis;
const parseHelper = require('../helpers').parseAction;
/*
site/game/* route:
auth/modes GET
game/rating POST
*/

const secret = new Buffer(process.env.JWT_KEY, 'base64');

module.exports = (app, db) => {
    // Get existed mods
    app.get('/game/modes', jwt_check({secret: secret}), (req, res) => {
        db.gameModes.all().then(data => {
            res.json(data);
        }).catch(error => {
            res.status(400).json({
                success: false,
                error: error.message || error
            });
        });
    });
    app.get('/games', (req, res) => {
        redis.keys('game:*').then(keys => keys.map((key) => {
                return redis.hgetall(key).then((game) => ({
                    id: +parseHelper(key),
                    start_at: game.startAt?game.startAt:null,
                    mode: game.mode?game.mode:null,
                }));
            })
        ).then(
            games => {
                res.status(200).json({
                    success: true,
                    data: games,
                })
            })
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



