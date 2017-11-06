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
            db.users.add(newUser.username, newUser.password, newUser.email)
            .then(data => {
                res.json({
                    success: true,
                    jwt: ''
                });
            })
            .catch(error => {
                let message = '';
                if(error.constraint === 'users_username_key'){
                    message = 'User whith this username alrady exist';
                } 
                if(error.constraint === 'users_email_key'){
                    message = 'User whith this email alrady exist';
                }
                res.json({
                    success: false,
                    message: message,
                    error: error.message || error
                });
            });
        }
    });
};