class ProfileRepository {
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }
}

module.exports = ProfileRepository;