/* There will be plased service routes, all of this routes must be turned off in production
    /user/create GET - for fast create user table by user repository model
    /user/drop GET - for fast drop user table by user repository model
*/

module.exports = (app, db) => {
          // Generic GET handler
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
    
    if (app.get('env') === 'development') {
        GET('/users/create', () => db.users.create());
        GET('/users/drop', () => db.users.drop());
    }
};