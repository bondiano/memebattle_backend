const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(
    dbConfig.DATABASE_NAME,
    dbConfig.DATABASE_USER,
    dbConfig.DATABASE_PASSWORD,
    {
        host: dbConfig.DATABASE_HOST || '127.0.0.1',
        dialect: 'postgres',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize
    .authenticate()
    .then(() => console.log('Connection with database has been established successfully.')); //eslint-disable-line

module.exports = sequelize;
