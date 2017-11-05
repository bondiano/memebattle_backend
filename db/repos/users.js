/*
 Users table model
*/

class UsersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        this.cs = createColumnsets(pgp);
    }

    // Creates the table;
    create() {
        return this.db.none('CREATE TABLE users(id serial PRIMARY KEY, username text NOT NULL, password text NOT NULL, email text NOT NULL, email_checked boolean DEFAULT false, profile_id serial)');
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
        return this.db.one('INSERT INTO users (username, password, email) VALUES($1, $2, $3)', username, password, email);
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
    findByName(name) {
        return this.db.oneOrNone('SELECT * FROM users WHERE name = $1', name);
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

//////////////////////////////////////////////////////////
// showing how to statically initialize ColumnSet objects

let cs; // ColumnSet objects static namespace

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs) {
        cs = {};
        // Type TableName is useful when schema isn't default, otherwise you can
        // just pass in a string for the table name;
        const table = new pgp.helpers.TableName({table: 'users', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['name'], {table});
        cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}

module.exports = UsersRepository;