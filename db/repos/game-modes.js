/*
 Game modes table model
*/
class GameModesRepository {
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    // Creates the table;
    create() {
        /*CREATE TABLE game_modes(
            id serial PRIMARY KEY,
            mode_name text UNIQUE NOT NULL,
            start_at timestamp,
            fiish_at timestamp,
            description text UNIQUE
        );*/
        return this.db.none('CREATE TABLE game_modes(id serial PRIMARY KEY, mode_name text UNIQUE NOT NULL, start_at timestamp, fiish_at timestamp, description text UNIQUE)');
    }

    // Drops the table;
    drop() {
        return this.db.none('DROP TABLE game_modes');
    }

    // Removes all records from the table;
    empty() {
        return this.db.none('TRUNCATE TABLE game_modes CASCADE');
    }

    // Add new game mode;
    add(name, description) {
        this.db.any(`INSERT INTO game_modes(mode_name, description) VALUES('${name}', '${description}')`);
    }

    // Select all modes;
    all() {
        return this.db.any('SELECT * FROM game_modes');
    }
}

module.exports = GameModesRepository;