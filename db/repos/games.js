/*
 Games table model
*/
class GamesRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    // Creates the table;
    create() {
        /*CREATE TABLE games(
            id serial PRIMARY KEY,
            status text DEFAULT 'prepare',
            mode_id INTEGER REFERENCES game_modes(id) ON UPDATE CASCADE ON DELETE CASCADE
        );*/
        return this.db.any(`CREATE TABLE games(id serial PRIMARY KEY, status text DEFAULT 'prepare', mode_id INTEGER REFERENCES game_modes(id) ON UPDATE CASCADE ON DELETE CASCADE)`);
    }


    createPlayedMemes() {
        /*CREATE TABLE played_memes(
        id serial PRIMARY KEY,
        game_id INTEGER NOT NULL REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE,
        meme_id INTEGER NOT NULL REFERENCES meme_storage(id) ON UPDATE CASCADE ON DELETE CASCADE
        );*/    
        return this.db.none(`CREATE TABLE played_memes(id serial PRIMARY KEY, game_id INTEGER NOT NULL REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE, meme_id INTEGER NOT NULL REFERENCES meme_storage(id) ON UPDATE CASCADE ON DELETE CASCADE)`);    
    }

    createPlayres() {
        /*CREATE TABLE playres(
        id serial PRIMARY KEY,
        game_id INTEGER NOT NULL REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
        );*/    
        return this.db.none(`CREATE TABLE playres(id serial PRIMARY KEY, game_id INTEGER NOT NULL REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE, user_id INTEGER NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)`);    
    }

    createWinerMemes() {
        /*CREATE TABLE winer_memes(
        id serial PRIMARY KEY,
        game_id INTEGER NOT NULL REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE,
        meme_id INTEGER NOT NULL REFERENCES meme_storage(id) ON UPDATE CASCADE ON DELETE CASCADE
        );*/    
        return this.db.none(`CREATE TABLE winer_memes(id serial PRIMARY KEY, game_id INTEGER NOT NULL REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE, meme_id INTEGER NOT NULL REFERENCES meme_storage(id) ON UPDATE CASCADE ON DELETE CASCADE);`);    
    }

    // Drops the table;
    drop() {
        return this.db.none('DROP TABLE games');
    }

    // Removes all records from the table;
    empty() {
        return this.db.none('TRUNCATE TABLE games CASCADE');
    }

    // Add new profile;
    add(status, modeId) {
        this.db.any(`INSERT INTO games(status, mode_id) VALUES('${status}', '${modeId}')`);
    }

    // Select all games;
    all() {
        return this.db.any('SELECT * FROM games');
    }

    // Update status
    updateStatus(id, status) {
        return this.db.query(`UPDATE games SET status = '${status}' WHERE id = '${id}'`);
    }
    
    getAllGameMemes(id) {
        return this.db.any(`SELECT meme_storage.id as meme_id, meme_storage.image_src as meme_image FROM meme_storage INNER JOIN played_memes ON meme_storage.id = played_memes.meme_id WHERE game_id = ${id}`);
    }

    getAllGameMembers(id) {
        return this.db.any(`SELECT users.id as user_id, users.username as username FROM users INNER JOIN playres ON users.id = playres.user_id WHERE game_id = ${id}`);
    }
}

module.exports = GamesRepository;