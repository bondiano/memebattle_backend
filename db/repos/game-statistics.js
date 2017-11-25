/*
 Game statistics (game_statistics) table model
*/

class GameStatisticsRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
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