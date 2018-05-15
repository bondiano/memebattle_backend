require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: `${process.env.DATABASE_NAME}_dev`,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    },
    test: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: `${process.env.DATABASE_NAME}_test`,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    },
    stage : {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: `${process.env.DATABASE_NAME}_stage`,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    },
};
