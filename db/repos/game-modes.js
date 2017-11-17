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
            description text UNIQUE,
            statistic_id serial UNIQUE NOT NULL
        );*/
        return this.db.none('CREATE TABLE game_modes(id serial PRIMARY KEY, mode_name text UNIQUE NOT NULL, start_at timestamp, fiish_at timestamp, description text UNIQUE, statistic_id serial UNIQUE NOT NULL)');
    }

    // Drops the table;
    drop() {
        return this.db.none('DROP TABLE game_modes');
    }

        // Removes all records from the table;
    empty() {
        return this.db.none('TRUNCATE TABLE game_modes CASCADE');
    }
}

module.exports = GameModesRepository;