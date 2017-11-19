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

module.exports = (app, db) => {
    const createJWT = (res, username, id, ref) => {
        const payload_access = {
            iss: `/auth/${ref}`,
            permissions: 'user'
        };
        const payload_refresh = {
            _id: id,
            iss: `/auth/${ref}`
        };
        const options_access = {
            expiresIn: '3h',
            jwtid: v4(),
        };
        const options_refresh = {
            expiresIn: '60d',
            jwtid: v4(),
        };

        jwt.sign(payload_access, secret, options_access, (err, token_access) => {
            jwt.sign(payload_refresh, secret, options_refresh, (err, token_refresh) => {
                db.users.setNewToken(username, token_refresh).then(() => {
                res.json({
                    success: true,
                    token_access: token_access,
                    token_refresh: token_refresh });
                })
                .catch(error => {
                    res.status(400).json({
                    success: false,
                    error: error.message || error });
                });
            });
        });
    };

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
                        const payload_access = {
                            iss: `/auth/login`,
                            permissions: 'user'
                        };
                        const payload_refresh = {
                            _id: data.id,
                            iss: `/auth/login`
                        };
                        const options_access = {
                            expiresIn: '3h',
                            jwtid: v4(),
                        };
                        const options_refresh = {
                            expiresIn: '60d',
                            jwtid: v4(),
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
                                    token_refresh: token_refresh 
                                });
                                })
                                .catch(error => {
                                    res.status(400).json({
                                    success: false,
                                    message: 'Please enter valid username and password.',
                                    error: error.message || error });
                                });
                            });
                        });
                    }).catch(error => {
                        res.status(400).json({
                            success: false,
                            message: 'Please enter valid username and password.',
                            error: error.message || error
                        });
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Please enter valid password.'
                    });
                }
            })
            .catch(error => {
                res.status(400).json({
                    success: false,
                    error: error.message || error
                });
            });
        }
    });

    app.post('/auth/refresh-token', (req, res) => {
        const id = jwt.decode(req.body.token_refresh)._id;
        const exp = jwt.decode(req.body.token_refresh).exp;
        db.users.isValidToken(id, req.body.token_refresh).then(isValid => {
            if(isValid && exp >= Math.floor(Date.now() / 1000)){
                db.users.findById(id).then(data =>
                    createJWT(res, data.username, id, 'refresh-token')
                )
                .catch(error => {
                    res.status(400).json({
                        success: false,
                        error: error.message || error
                    });
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Token is not valid, You must login again"
                });
            }
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                error: error.message || error
            });
        });
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
            .then(data => db.users.findByUsername(newUser.username).then(data => {
                db.profiles.add(data.id);
            }))
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

    //test for token. Must use Authorization: Bearer <token> in header
    app.get('/auth/secret', jwt_check({ secret: secret }), (req, res) => {
        console.log(req.user.permissions);
        // if (!req.user.admin){
        //     return res.sendStatus(401);
        // }
        res.sendStatus(200);
    });
};
