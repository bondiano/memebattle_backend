const {
    User,
    TempUser,
} = require('@models');
//eslint-disable-next-line
User.sync({ force: true }).then(() => console.log('User migration has done.'));
//eslint-disable-next-line
TempUser.sync({ force: true }).then(() => console.log('TempUser migration has done.'));
