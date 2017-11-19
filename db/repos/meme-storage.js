/*
 Meme storage table model
*/
class MemeStorageRepository {
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    // Creates the table;
    create() {
        /*CREATE TABLE meme_storage(
            id serial PRIMARY KEY,
            image_src text NOT NULL,
            description text,
            added_at timestamp DEFAULT now(),
            likes_count NUMERIC DEFAULT 0,
            reposts_count NUMERIC DEFAULT 0,
            factor NUMERIC DEFAULT 0,
            mode_id INTEGER REFERENCES game_modes(id)
        );*/
        return this.db.none('CREATE TABLE meme_storage(id serial PRIMARY KEY, image_src text NOT NULL, description text, added_at timestamp DEFAULT now(), likes_count NUMERIC DEFAULT 0, reposts_count NUMERIC DEFAULT 0, factor NUMERIC DEFAULT 0, mode_id INTEGER REFERENCES game_modes(id))');
    }

    // Drops the table;
    drop() {
        return this.db.none('DROP TABLE meme_storage');
    }

    // Removes all records from the table;
    empty() {
        return this.db.none('TRUNCATE TABLE meme_storage CASCADE');
    }

    // Add new game mode;
    add(imageSrc, description, likesCount, repostsCount, factor, modeId) {
        this.db.any(`INSERT INTO meme_storage(image_src, description, likes_count, reposts_count, factor, mode_id) VALUES('${imageSrc}', '${description}', '${likesCount}', '${repostsCount}', '${factor}', '${modeId}')`);
    }

    // Select all modes;
    all() {
        return this.db.any('SELECT * FROM meme_storage');
    }
}

module.exports = MemeStorageRepository;