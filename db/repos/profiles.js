/*
 Profiles (profiles) table model
*/

class ProfilesRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
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