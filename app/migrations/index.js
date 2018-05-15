require('module-alias/register');

const {
    user,
    tempUser,
} = require('../models');
//eslint-disable-next-line
user.sync({ force: true }).then(() => console.log('User migration has done.'));
//eslint-disable-next-line
tempUser.sync({ force: true }).then(() => console.log('TempUser migration has done.'));
