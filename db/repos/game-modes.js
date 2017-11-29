/**
 * Game modes (game_modes) table model
 */

class GameModesRepository {
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    // Add new game mode;
    add(name, description) {
        this.db.any('INSERT INTO game_modes(mode_name, description) VALUES($1, $2)', [name, description]);
    }

    // Select all modes;
    all() {
        return this.db.any('SELECT * FROM game_modes');
    }
}

module.exports = GameModesRepository;