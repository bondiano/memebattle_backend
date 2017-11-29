/** 
 * Meme storage (meme_storage) table model
 */

class MemeStorageRepository {
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    // Add new game mode;
    add(imageSrc, description, likesCount, repostsCount, factor, modeId) {
        this.db.oneOrNone('INSERT INTO meme_storage(image_src, description, likes_count, reposts_count, factor, mode_id) VALUES($1, $2, $3, $4, $5, $6)', [imageSrc, description, likesCount, repostsCount, factor, modeId]);
    }

    // Select all modes;
    all() {
        return this.db.any('SELECT * FROM meme_storage');
    }
}

module.exports = MemeStorageRepository;