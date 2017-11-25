/*
 Games (games, played_memes, playres, winer_memes) table model
*/

class GamesRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
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