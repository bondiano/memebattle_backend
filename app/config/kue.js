require('dotenv').config();

module.exports = {
    port: process.env.KUE_PORT,
    db: process.env.KUE_REDIS_DB,
    ui: {
        login: process.env.KUE_LOGIN,
        password: process.env.KUE_PASSWORD
    }
};
