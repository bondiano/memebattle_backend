const {CAS: {CAS_URL, PARTNER_ID}} = require('../config/config');

const socialNetwork = (req, res) => {
    const {provider} = res.params;

    return res.redirect(`${CAS_URL}/auth/${provider}?partner_id=${PARTNER_ID}`);
};

const registration = (req, res) => {
    return res.success();
};

const login = (req, res) => {
    return res.success();
};

module.exports = {
    socialNetwork,
    registration,
    login
};
