require('dotenv').config();

module.exports = {
    HOST: process.env.HOST || '127.0.0.1',
    REST_PORT: process.env.REST_PORT || '8080',
    SOCKET_PORT: process.env.SOCKET_PORT || '8000',
    KUE_PORT: process.env.KUE_PORT || '8001',
    NODE_ENV: process.env.NODE_ENV,
    CAS: {
        PARTNER_ID: process.env.PARTNER_ID,
        CAS_URL: process.env.CAS_URL,
    },
    TEMPUSER_EXPIRED: 1000 * 60 * 60 * 24, // After one day
    CLIENT_WS_PREFIX: '@@ws_serv/',
    SERVER_WS_PREFIX: '@@ws_cli/',
};
