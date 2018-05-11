const sequelize = require('../bootstrap/database');

const User = sequelize.define('user', {
    // attributes here...
});

module.exports = User;
