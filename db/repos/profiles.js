/**
 * Profiles (profiles) table model
 */

class ProfilesRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    // Add new profile;
    add(id) {
        return this.db.oneOrNone('INSERT INTO profiles(user_id) VALUES($1)', id);
    }

    // Select all profiles;
    all() {
        return this.db.any('SELECT * FROM profiles');
    }
    
    // Add coin to profile with id
    addCoin(id, count) {
        //console.log(id);        
        return this.db.query('UPDATE profiles SET coins_count = coins_count + $1 WHERE user_id = $2', [count, id]);
    }
}

module.exports = ProfilesRepository;