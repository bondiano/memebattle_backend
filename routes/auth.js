var jwt = require('express-jwt');
/*  
site/auth/* route:
auth/login POST
auth/signup POST
auth/logout GET
*/

module.exports = (app, db) => {
    app.post('/auth/login', (req, res) => {
        if(!req.body.username || !req.body.password){
            res.json({
                success: false,
                message: 'Please enter username and password.'
            });
        } else { 
            const username = req.body.username;
            const password = req.body.password;
            db.users.isValidUserPassword(username,password).then(isValid =>{
                if(isValid){
                    res.json({
                        success: true,
                        message: 'Good job.'
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Please enter valid password.'
                    });
                }
            }
            );
        }
    });

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
                    message: 'You was registered',
                });
            })
            //TODO .then(create user profile)
            .catch(error => {
                let message = 'Unexpectedly error';
                if(error.constraint === 'users_username_key'){
                    message = 'User with this username already exists';
                } 
                if(error.constraint === 'users_email_key'){
                    message = 'User with this username already exists';
                }
                res.json({
                    success: false,
                    message: message,
                    error: error.message || error
                });
            });
        }
    });

    app.get('/auth/logout', (req, res) => {

    });
};