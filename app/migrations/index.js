const User = require('../models/user.model');

//eslint-disable-next-line
User.sync({ force: true }).then(() => console.log('User migration has done.')); 
