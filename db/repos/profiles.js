/*
 Profiles modes table model
*/
class ProfilesRepository {
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    // Creates the table;
    create() {
        /*CREATE TABLE profiles(
            id serial PRIMARY KEY,
            coins_count NUMERIC DEFAULT 0,
            avatar text
        );*/
        return this.db.none('CREATE TABLE profiles(id serial PRIMARY KEY, coins_count NUMERIC DEFAULT 0, avatar text)');
    }

    // Drops the table;
    drop() {
        return this.db.none('DROP TABLE profiles');
    }

    // Removes all records from the table;
    empty() {
        return this.db.none('TRUNCATE TABLE profiles CASCADE');
    }

    add(id) {
        this.db.any(`INSERT INTO profiles(id) VALUES('${id}')`);
    }

    addCoin(id, count) {
        this.db.query(`UPDATE profiles SET coins = coins + ${count} WHERE id = ${id}`);
    }
}

module.exports = ProfilesRepository;