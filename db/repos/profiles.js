/*
 Profiles table model
*/
class ProfilesRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    // Creates the table;
    create() {
        /*CCREATE TABLE profiles(
            id serial PRIMARY KEY,
            coins_count NUMERIC DEFAULT 0,
            avatar text,
            user_id INTEGER UNIQUE NOT NULL REFERENCES users(id)
    );*/
        return this.db.none('CREATE TABLE profiles(id serial PRIMARY KEY, coins_count NUMERIC DEFAULT 0, avatar text, user_id INTEGER UNIQUE NOT NULL REFERENCES users(id))');
    }

    // Drops the table;
    drop() {
        return this.db.none('DROP TABLE profiles');
    }

    // Removes all records from the table;
    empty() {
        return this.db.none('TRUNCATE TABLE profiles CASCADE');
    }

    // Add new profile;
    add(id) {
        this.db.none(`INSERT INTO profiles(user_id) VALUES('${id}')`);
    }

    // Select all profiles;
    all() {
        return this.db.any('SELECT * FROM profiles');
    }
    
    // Add coin to profile with id
    addCoin(id, count) {
        this.db.query(`UPDATE profiles SET coins_count = coins_count + ${count} WHERE user_id = ${id}`);
    }
}

module.exports = ProfilesRepository;