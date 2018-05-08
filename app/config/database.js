require('dotenv').config();

module.exports = {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
};
