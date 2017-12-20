
const pgdb = require('../db/pg-db');
const redis = require('../redis')().redis;
/* TODO: Replace this with Game mods class */

const unlimitedBattle = (gameId) => {
    const pairCount = 32;

    const redisHget = (key, defaultVal) => {
        return redis.hget(`game:${gameId}:1`, key).then(result => {
            if(typeof result == Promise){
                result.then(data => {
                    return data;
                });
            }
            if(result) {
                return result;
            } else {
                redis.hmset(`game:${gameId}:1`, { [key]: defaultVal });
                return defaultVal;
            }
        }).catch(err => {
            console.log(err);
            redis.hmset(`game:${gameId}:1`, { [key]: defaultVal });
            return defaultVal;
        });
    };

    const init = async function() {
        let lastId = await redisHget('lasrId', 0);

        let memeStorage = await pgdb.memeStorage.get(lastId, pairCount).then(data => (data)); // TODO: FIX TO dynamic
        await memeStorage.forEach(el => {
            redis.hmset(`game:${gameId}:1`, { [el.id]: el.image_src });
        });
    };

    const getCurrentPair = async function() {
        const leftMemeId = await redisHget('leftMemeId', 1);
        const rightMemeId = await redisHget('rightMemeId', 2);
        const leftImg = await redisHget(leftMemeId, 1);
        const rightImg = await redisHget(rightMemeId, 2);
        const rightLikes = await redisHget('rightLikes', 0);
        const leftLikes = await redisHget('leftLikes', 0);
        const leftMemeImg = await redisHget('leftMemeImg', leftImg);
        const rightMemeImg = await redisHget('rightMemeImg', rightImg);

        await console.log(rightMemeImg);
        return await { leftId: leftMemeId,
                leftImg: leftMemeImg,
                rightId: rightMemeId,
                rightImg: rightMemeImg,
                rightLikes: rightLikes,
                leftLikes: leftLikes, };
    };

    const getPairWinner = async function() {
        const leftLikes = redisHget('leftLikes', 0);
        const rightLikes = redisHget('rightLikes', 0);
        let winner = 0;
        if (leftLikes === rightLikes) {
            return 2;
        } else if (leftLikes > rightLikes) {
            return 0;
        } else {
            return 1;
        }
        return { rightLikes: rightLikes,
                leftLikes: leftLikes,
                winner, };
    };

    const setNewPair = async function() {
        let currentPair = getCurrentPair();
        let lastId = redisHget('lastId', 0);

        if(currentPair.rightId >= lastId) {
            lastId += pairCount;
            redis.hmset(`game:${gameId}:1`, { lastId: lastId }); //return promise. Next line start before this line
            init();
            // TODO: Check if mems in db not enought
        }

        redis.hmset(`game:${gameId}:1`, {
            leftId: await redisHget('leftMemeId', 1) + 2,
            leftImg: await redisHget('rightMemeImg', await redisHget(leftMemeId, 2)),
            rightId: await redisHget('rightMemeId', 2) + 2,
            rightLikes: 0,
            leftLikes: 0,
        });
    };

    const addMemeLikes = async function(right) { // 0 - left, 1 - right
        if (right) { // TODO: normal check by mem id
            redis.hmset(`game:${gameId}:1`, { rightLikes: redisHget('rightLikes', 0) + 1 });
        } else {
            redis.hmset(`game:${gameId}:1`, { leftLikes: redisHget('leftLikes', 0) + 1 });
        }
    };

    return {
        init: init,
        getCurrentPair: getCurrentPair,
        getPairWinner: getPairWinner,
        addMemeLikes: addMemeLikes,
    }
};

const gameModeHandler = (modeId, gameId) => {
    switch(+modeId) {
        case 1: // unlimited battle
            return unlimitedBattle(gameId);
        default: // undefined mode
            return;
    }
};

module.exports = gameModeHandler;
