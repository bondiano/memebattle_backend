const Sequelize = require('sequelize');
const sequelize = require('../bootstrap/database');

const uuid = require('uuid/v4');

const TempUser = sequelize.define('temp_user', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid(),
    },
    token: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    socket_id: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    coins: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

module.exports = TempUser;
