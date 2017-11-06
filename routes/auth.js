var jwt = require('express-jwt');
/*  
site/auth/* route:
    auth/login 
    auth/signup
    auth/logout
*/

module.exports = (app, db) => {
    app.post('/auth/signup', (req, res) => {
        if(!req.body.username || !req.body.email || !req.body.password){
            res.json({
                success: false,
                message: 'Please enter username, email and password.'
            });
        } else {
            let newUser = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            };
            db.users.add(newUser.username, newUser.password, newUser.email).then(data => {
                res.json({
                    success: true
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
        }
    });
};