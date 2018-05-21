module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TempUsers', {
            id: {
                allowNull: false,
                primaryKey: true,
                unique: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            token: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            socketId: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            coins: {
                allowNull: false,
                type: Sequelize.BIGINT,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('TempUsers');
    },
};
