module.exports = (sequelize, DataTypes) => {
    const TempUser = sequelize.define('TempUser', {
        id: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        token: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        socketId: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        coins: {
            allowNull: false,
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
    }, {
        timestamps: true,
    });
    TempUser.associate = () => {
    // associations can be defined here
    };
    return TempUser;
};
