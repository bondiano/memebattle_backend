const bcrypt = require('bcrypt-nodejs');

/**
 * Generate a salt asynchronously and return Promise
 * @param rounds Number of rounds to process the data for
 * @returns {Promise}
 */
const genSalt = (rounds) =>
    new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

/**
 * Generate a hash asynchronously and return Promise
 * @param data Data to be encrypted
 * @param salt Salt to be used in encryption
 * @returns {Promise}
 */
const hash = (data, salt) =>
    new Promise((resolve, reject) => {
        bcrypt.hash(data, salt, null, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

module.exports = {
    genSalt,
    hash,
};
