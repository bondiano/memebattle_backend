const jwt_gen = require('jsonwebtoken');
const v4 = require('node-uuid').v4;
require('dotenv').config({path: '../config/.env'});
/*  
site/auth/* route:
auth/login POST
auth/signup POST
auth/logout GET
*/

module.exports = (app, db) => {
    app.post('/auth/login', (req, res) => {
        if(!req.body.username || !req.body.password){
            res.status(400).json({
                success: false,
                message: 'Please enter username and password.'
            });
        } else { 
            const username = req.body.username;
            const password = req.body.password;
            db.users.isValidUserPassword(username,password).then(isValid =>{
                if(isValid){
                    // jwt: send two token: access, refresh and in expires_in unix timestamp
                    db.users.getId(username).then(data =>{
                        const payload = {
                            _id: data.id,
                            iss: 'http://localhost:'+ process.env.SERVER_PORT,
                            permissions: 'user'
                        };
                        const options = {
                            expiresIn: '1d',
                            jwtid: v4(),
                        };
                        const secret = new Buffer(process.env.JWT_KEY, 'base64');
                        jwt_gen.sign(payload, secret, options, (err, token) => {
                            res.json({
                                success: true,
                                message: 'Good job.',
                                data: token });
                          });
                    });

                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Please enter valid password.'
                    });
                }
            }
            );
        }
    });

    app.post('/auth/refresh-token', (req, res) => {

    });

    app.post('/auth/signup', (req, res) => {
        if(!req.body.username || !req.body.email || !req.body.password){
            res.status(400).json({
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
                res.status(400).json({
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