const serverPerfix = '@@ws_serv/';
const clientPerfix = '@@ws_cli/';

module.exports = {
    TEMP_USER: 'temp-user',
    ERROR: 'error',
    tempUser: {
        CREATE: `${clientPerfix}USER_CREATE`,
        UNKNOWN: `${serverPerfix}USER_UNKNOWN_TYPE`,
        CREATED: `${serverPerfix}USER_CREATED`,
    },
};
