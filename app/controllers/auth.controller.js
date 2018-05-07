const {CAS: {CAS_URL, PARTNER_ID}} = require('../config/config');

module.exports = {
    socialNetwork: (req, res) => {
        const {provider} = res.params;

        return res.redirect(`${CAS_URL}/auth/${provider}?partner_id=${PARTNER_ID}`);
    },

    registration: (req, res) => {
        return res.success();        
    },

    login: (req, res) => {
        return res.success();
    }
};
