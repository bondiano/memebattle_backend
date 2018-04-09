const Sequelize = require('../bootstrap/database');

const User = Sequelize.define('user', {
    // attributes here...
});

module.exports = User;