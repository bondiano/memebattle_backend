/*
 Users table model
*/
const bcrypt = require('bcrypt');

class UsersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
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
            profile_id serial UNIQUE NOT NULL
        );*/
        return this.db.none('CREATE TABLE users(id serial PRIMARY KEY, username text UNIQUE NOT NULL, password text NOT NULL, email text UNIQUE NOT NULL, email_checked boolean DEFAULT false, registred_at timestamp DEFAULT now(), profile_id serial UNIQUE NOT NULL)');
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
        const saltRounds = 10;
        password = bcrypt.hashSync(password, saltRounds)
        return this.db.any(`INSERT INTO users(username, password, email) VALUES('${username}', '${password}', '${email}')`);
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