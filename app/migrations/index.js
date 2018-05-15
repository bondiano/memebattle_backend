require('module-alias/register');

const {
    user,
    tempUser,
} = require('../models');

//eslint-disable-next-line
user.sync({ force: false }).then(() => console.log('User migration has done.'));
//eslint-disable-next-line
tempUser.sync({ force: false }).then(() => console.log('TempUser migration has done.'));
