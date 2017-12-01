/** 
 * Users (users) table model
 */

const bcrypt = require('bcrypt');

class UsersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.saltRounds = 10;
    }

    // Adds a new user, and returns the new object;
    add(username, password, email) {
        return bcrypt.hash(password, this.saltRounds).then((hash) =>
            this.db.oneOrNone('INSERT INTO users(username, password, email) VALUES($1, $2, $3)', [username, hash, email]));
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id) {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, r => r.rowCount);
    }

    // Tries to find a user from id;
    findById(id) {
        return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
    }

    // Tries to find a user from name;
    findByUsername(username) {
        return this.db.one('SELECT * FROM users WHERE username = $1', username);
    }

    // Tries to find a user from email;
    findByEmail(email) {
        return this.db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
    }

    // Set username
    setNewUsername(username, newUsername) {
        return this.db.query('UPDATE users SET username = $1 where username = $2', [username, newUsername]);
    }

    // Set email adress
    setNewEmail(username, newEmail) {
        return this.db.query('UPDATE users SET username = $1 where username = $2', [username, newEmail]);
    }

    // Get user password
    getUserPassword(username){
        return this.db.oneOrNone('SELECT password FROM users WHERE username = $1', username);
    }

    // Get id by username
    getId(username){
        return this.db.oneOrNone('SELECT id FROM users WHERE username = $1', username);
    }

    // Check user password
    isValidUserPassword(username, password){
        return this.getUserPassword(username).then(data =>
            bcrypt.compare(password, data.password).then(res => res));
    }

    // Check jwt refresh token
    isValidToken(id, token){
        return this.db.oneOrNone('SELECT token FROM users WHERE id = $1', id).then(data => data.token === token);
    }

    // Set password
    setNewPassword(username, newPassword){
        this.getUserPassword(username).then(data => {
            bcrypt.compare(newPassword, data).then((res) => {
                if(res){
                    bcrypt.hash(newPassword, this.saltRounds).then((hash) => {
                        return this.none('UPDATE users SET password = $1 where username = $2', [hash, username]);
                    });
                } else {
                    return false;
                }
            });
        })
        .catch(error => error);
    }

    // Get new jwt refresh token
    getToken(username){
        return this.db.oneOrNone('SELECT token FROM users WHERE username = $1', username);
    }

    // Set new jwt refresh token
    setNewToken(username, refreshToken){
        return this.db.none('UPDATE users SET token = $2 where username = $1', [username, refreshToken]);
    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM users');
    }

    // Returns the total number of users;
    total() {
        return this.db.one('SELECT count(*) FROM repository  users', [], a => +a.count);
    }

    // Return user coin count
    getUserCoinCount(id){
        return this.db.one('SELECT profiles.coins_count AS coins FROM users INNER JOIN profiles ON users.id = profiles.user_id WHERE users.id = $1', id)
    }

    // Returns the total user order in coins-count top;
    getUserWithRating(id) {
        return this.db.one('SELECT rating, username, coins FROM (SELECT id, row_number() OVER () as rating, username, coins FROM (SELECT users.id AS id, users.username AS username, profiles.coins_count AS coins FROM users INNER JOIN profiles ON users.id = profiles.user_id ORDER BY profiles.coins_count DESC) AS top) AS toplist WHERE id = $1', id);
    }

    // Returns the best users by coin count;
    getTop(count) {
        return this.db.any('SELECT users.username as username, profiles.coins_count as coins FROM users INNER JOIN profiles ON users.id = profiles.user_id ORDER BY coins DESC LIMIT $1', count);
    }
}

module.exports = UsersRepository;
