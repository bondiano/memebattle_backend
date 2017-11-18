/*
 Game statistics modes table model
*/
class GameStatisticsRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    // Creates the table;
    create() {
        /*CREATE TABLE game_statistics(
            id serial PRIMARY KEY,
            raund  NUMERIC NOT NULL,
            fiish_at timestamp DEFAULT now(),
            winers_json text,
            mode_id serial REFERENCES game_modes(id)
        );*/
        return this.db.none('CREATE TABLE game_statistics( id serial PRIMARY KEY, raund  NUMERIC NOT NULL, fiish_at timestamp DEFAULT now(), winers_json text, mode_id serial REFERENCES game_modes(id))');
    }

    // Drops the table;
    drop() {
        return this.db.none('DROP TABLE game_statistics');
    }

    // Removes all records from the table;
    empty() {
        return this.db.none('TRUNCATE TABLE game_statistics CASCADE');
    }

    // Add new raund to statistic;
    add(raund, winers, modeId) {
        this.db.any(`INSERT INTO game_statistics(raund, winers_json, mode_id) VALUES('${raund}', '${winers}', '${modeId}')`);
    }

    // Select full statistic;
    all() {
        return this.db.any('SELECT * FROM profiles');
    }
}

module.exports = GameStatisticsRepository;