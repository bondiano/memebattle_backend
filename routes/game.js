module.exports = (app, db) => {
    app.get('/game/', (req, res) => {

    });

    app.get('/game/modes', (req, res) => {
        db.gameModes.all().then(data  => {
            res.json(data);
        }).catch(error => {
            res.status(400).json({
                success: false,
                error: error.message || error
            });
        });
    });
};