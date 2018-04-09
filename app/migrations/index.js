const User = require('../models/user.model');

User.sync({ force: true }).then(() => console.log('User migration has done.'));