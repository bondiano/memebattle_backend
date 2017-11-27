const jwt = require('jsonwebtoken');
const jwt_check = require('express-jwt');
const v4 = require('node-uuid').v4;
require('dotenv').config({path: '../config/.env'});

/*
site/auth/* route:
auth/login POST
auth/signup POST
auth/refresh-token POST
auth/secret GET
*/

const secret = new Buffer(process.env.JWT_KEY, 'base64');

const payload_access = {
    iss: `/auth`,
    permissions: 'user',
};
const options_access = {
    expiresIn: '3h',
    jwtid: v4(),
};
const options_refresh = {
    expiresIn: '60d',
    jwtid: v4(),
};

module.exports = (app, db) => {
    // User login route, your CO
    app.post('/auth/login', (req, res) => {
        if(!req.body.username || !req.body.password){
            res.status(400).json({
                success: false,
                message: 'Please enter username and password.'
            });
            return;
        }
        const username = req.body.username;
        const password = req.body.password;
        db.users.isValidUserPassword(username, password).then(isValid => {
            console.log(isValid)
            if(isValid){
                // jwt: send two token: access, refresh and in expires_in unix timestamp
                db.users.getId(username).then(data =>{
                    // refresh payload here because it uses id
                    const payload_refresh = {
                        iss: `/auth`,
                        _id: data.id,
                    };
                    jwt.sign(payload_access, secret, options_access, (err, token_access) => {
                        jwt.sign(payload_refresh, secret, options_refresh, (err, token_refresh) => {
                            db.users.setNewToken(username, token_refresh).then(() => {
                                res.json({
                                    success: true,
                                    _id: data.id,
                                    username: username,
                                    permissions: 'user',
                                    token_access: token_access,
                                    token_refresh: token_refresh, });
                            });
                        });
                    });
                })
            } else {
                throw "Username or password is not valid";
            }
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: 'Please enter valid username or password.',
                error: error.message || error
            });
        });
    });

    // Route for create new tokens
    app.post('/auth/refresh-token', (req, res) => {
        // inital time info
        const id = jwt.decode(req.body.token_refresh)._id;
        const exp = jwt.decode(req.body.token_refresh).exp;

        db.users.isValidToken(id, req.body.token_refresh)
        .then(isValid => {
            if(isValid && exp >= Math.floor(Date.now() / 1000)){
                db.users.findById(id)
                .then(data => {
                    // refresh payload here because it uses id
                    const payload_refresh = {
                        iss: `/auth`,
                        _id: data.id,
                    };

                    jwt.sign(payload_access, secret, options_access, (err, token_access) => {
                        jwt.sign(payload_refresh, secret, options_refresh, (err, token_refresh) => {
                            db.users.setNewToken(data.username, token_refresh).then(() => {
                            res.json({
                                success: true,
                                token_access: token_access,
                                token_refresh: token_refresh, });
                            })
                            .catch(error => {
                                res.status(400).json({
                                success: false,
                                error: error.message || error, });
                            });
                        });
                    })
                })
                .catch(error => {
                    res.status(400).json({
                        success: false,
                        error: error.message || error, });
                });
            } else {
                throw "Error: token was expired";
            }
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                message: "Token is not valid, You must login again",
                error: error.message || error, });
        });
    });

    // Users registeration route
    app.post('/auth/signup', (req, res) => {
        if(!req.body.username || !req.body.email || !req.body.password){
            res.status(400).json({
                success: false,
                message: 'Please enter username, email and password.'
            });
            return;
        }

        let newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        db.users.add(newUser.username, newUser.password, newUser.email)
        .then(data => db.users.findByUsername(newUser.username)
        .then(data => {
            db.profiles.add(data.id).then(data => {
                res.json({
                    success: true,
                    message: 'You was registered',
                });
            });
        }))
        .catch(error => {
            let message;
            switch(error.constraint){
                case 'users_username_key':
                    message = 'User with this username already exists';
                    break;
                case 'users_email_key':
                    message = 'User with this email already exists';
                    break;
                default:
                    message = 'Unexpectedly error';
            }
            res.status(400).json({
                success: false,
                message: message,
                error: error.message || error
            });
        });
    });

    // Test for token. Must use Authorization: Bearer <token> in header
    app.get('/auth/secret', jwt_check({ secret: secret }), (req, res) => {
        console.log(req.user.permissions);
        res.sendStatus(200);
    });
};
