const { config: { SERVER_WS_PREFIX, CLIENT_WS_PREFIX } } = require('@config');

module.exports = {
    TEMP_USER: 'temp-user',
    ERROR: '_error',
    tempUser: {
        CREATE: `${CLIENT_WS_PREFIX}USER_CREATE`,
        CONNECT: `${CLIENT_WS_PREFIX}USER_CONNECT`,

        UNKNOWN: `${SERVER_WS_PREFIX}USER_UNKNOWN_TYPE`,
        CREATED: `${SERVER_WS_PREFIX}USER_CREATED`,
        CONNECTED: `${SERVER_WS_PREFIX}USER_CONNECTED`,
    },
};
