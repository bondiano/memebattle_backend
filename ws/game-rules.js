
const pgdb = require('../db/pg-db');
const redis = require('../redis')().redis;

const unlimitedBattle = async function(gameId) {
    let memeStorage = await pgdb.memeStorage.get(0, 33).then(data => (data)); // TODO: FIX TO dynamic
    await console.log(memeStorage);
    await redis.hmset(`game:${gameId}:1`, { memeStorage: { ...memeStorage } });
}

const gameModeHandler = (modeId, gameId) => { 
    switch(modeId) {
        case 1: // unlimited battle
            return unlimitedBattle(gameId);
        default: // undefinde mode
            return;
    }
};

module.exports = gameModeHandler;