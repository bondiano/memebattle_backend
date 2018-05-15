const serverPerfix = '@@ws_serv/';
const clientPerfix = '@@ws_cli/';

module.exports = {
    TEMP_USER: 'temp-user',
    ERROR: '_error',
    tempUser: {
        CREATE: `${clientPerfix}USER_CREATE`,
        CONNECT: `${clientPerfix}USER_CONNECT`,

        UNKNOWN: `${serverPerfix}USER_UNKNOWN_TYPE`,
        CREATED: `${serverPerfix}USER_CREATED`,
        CONNECTED: `${serverPerfix}USER_CONNECTED`,
    },
};
