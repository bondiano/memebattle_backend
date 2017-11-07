/*
 Users table model
*/
const bcrypt = require('bcrypt');

class UsersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.saltRounds = 10;
    }

    // Creates the table;
    create() {
        /*CREATE TABLE users(
            id serial PRIMARY KEY, 
            username text UNIQUE NOT NULL, 
            password text NOT NULL, 
            email text UNIQUE NOT NULL, 
            email_checked boolean DEFAULT false, 
            registred_at timestamp NOT NULL, 
            token text DEFAULT random(),
            profile_id serial UNIQUE NOT NULL
        );*/
        return this.db.none('CREATE TABLE users(id serial PRIMARY KEY, username text UNIQUE NOT NULL, password text NOT NULL, email text UNIQUE NOT NULL, email_checked boolean DEFAULT false, registred_at timestamp DEFAULT now(), token text DEFAULT random(), profile_id serial UNIQUE NOT NULL)');
    }

    // Drops the table;
    drop() {
        return this.db.none('DROP TABLE users');
    }

    // Removes all records from the table;
    empty() {
        return this.db.none('TRUNCATE TABLE users CASCADE');
    }

    // Adds a new user, and returns the new object;
    add(username, password, email) {
        return bcrypt.hash(password, this.saltRounds).then((hash) =>
            this.db.any(`INSERT INTO users(username, password, email) VALUES('${username}', '${hash}', '${email}')`));
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
        return this.db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
    }

    // Tries to find a user from email;
    findByEmail(email) {
        return this.db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
    }

    // Set username
    setNewUsername(username, newUsername) {
        return this.db.query(`UPDATE users SET username = '${newUsername}' where username = '${username}'`);
    }

    // Set email adress
    setNewEmail(username, newEmail) {
        return this.db.query(`UPDATE users SET username = '${newEmail}' where username = '${username}'`);
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

    // Set password
    setNewPassword(username, newPassword){
        this.getUserPassword(username).then(data => {
            bcrypt.compare(newPassword, data).then((res) => {
                if(res){ // res == true
                    bcrypt.hash(newPassword, this.saltRounds).then((hash) => {
                        return this.none(`UPDATE users SET password = '${hash}' where username = '${username}'`);
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

    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM users');
    }

    // Returns the total number of users;
    total() {
        return this.db.one('SELECT count(*) FROMhis repository  users', [], a => +a.count);
    }
}

module.exports = UsersRepository;