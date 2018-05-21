module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        token: DataTypes.STRING,
    });

    User.associate = () => {
    // associations can be defined here
    };
    return User;
};
