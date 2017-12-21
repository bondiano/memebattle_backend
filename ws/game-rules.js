const pgdb = require('../db/pg-db');
const redis = require('../redis')().redis;
const types = require('./types');
/* TODO: Replace this with Game mods class */

const unlimitedBattle = (gameId) => {
    const pairCount = 32;
    const waitVoiterDelay = 15000; // ms
    const waitNextPairTimer = 20000; // ms

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
        let lastId = + await redisHget('lastId', 0);

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

        return await { leftMemeId: leftMemeId,
                leftMemeImg: leftMemeImg,
                rightMemeId: rightMemeId,
                rightMemeImg: rightMemeImg,
                rightLikes: rightLikes,
                leftLikes: leftLikes, };
    };

    const getPairWinner = async function() {
        const leftLikes = await redisHget('leftLikes', 0);
        const rightLikes = await redisHget('rightLikes', 0);
        let winner = 0;
        if (leftLikes === rightLikes) {
            winner = 2;
        } else if (leftLikes > rightLikes) {
            winner = 0;
        } else {
            winner = 1;
        }
        return { rightLikes: rightLikes,
                leftLikes: leftLikes,
                winner: winner, };
    };

    const setNewPair = async function() {
        let currentPair = await getCurrentPair();
        let lastId = + await redisHget('lastId', 0);

        if(currentPair.rightMemeId >= lastId) {
            lastId += pairCount;
            await redis.hmset(`game:${gameId}:1`, { lastId: lastId }); //return promise. Next line start before this line
            await init();
        }

        const leftMemeId = + await redisHget('leftMemeId', 1) + 2;
        const rightMemeId = + await redisHget('rightMemeId', 2) + 2;
        const leftMemeImg = await redisHget(leftMemeId, 1);
        const rightMemeImg = await redisHget(rightMemeId, 2);

        // TODO: CLEAR REDIS!
        await redis.hdel(`game:${gameId}:1`, leftMemeId - 2, [rightMemeId - 2]);
        
        redis.hmset(`game:${gameId}:1`, {
            leftMemeId: leftMemeId,
            leftMemeImg: leftMemeImg,
            rightMemeId: rightMemeId,
            rightMemeImg: rightMemeImg,
            rightLikes: 0,
            leftLikes: 0,
            voitedRight: '0',
            voitedLeft: '0',
        });
    };

    const addMemeLikes = async function(right, userId) { // 0 - left, 1 - right
        if (right) { // TODO: normal check by mem id
            await redis.hmset(`game:${gameId}:1`, { 
                rightLikes: + await redisHget('rightLikes', 0) + 1,
                voitedRight: await redisHget('voitedRight', 0) + `:${userId}`,
            });
        } else {
            await redis.hmset(`game:${gameId}:1`, { 
                leftLikes: + await redisHget('leftLikes', 0) + 1,
                voitedLeft: await redisHget('voitedLeft', 0) + `:${userId}`,
            });
        }
    };

    const addMemcoins = async function(winner) {
        let usersId = "";
        if (winner === 0) {
            usersId = await redisHget('voitedLeft', 0);
        } else if (winner === 1) {
            usersId = await redisHget('voitedRight', 0);
        }
        await usersId.split(':').forEach((el) => {
            if(el) {
                pgdb.profiles.addCoin(el, 1);
            }
        })
    };

    const sendWinner = async function() {
        setTimeout(async function() {
            const winData = await getPairWinner();
            addMemcoins(winData.winner);
            await redis.publish(`action:${types.PAIR_WINNER}`, JSON.stringify({ game_id: gameId, ...winData}));            
        }, waitVoiterDelay);
    };

    const sendFirstPair = async function() {
        const pair = await getCurrentPair();
        await redis.publish(`action:${types.NEW_PAIR}`, JSON.stringify({ game_id: gameId, ...pair}));
        await sendWinner(gameId);
    };

    const gameloop = async function() {
        /* TODO: Make it normal */
        if(gameId === 0) {
            await redis.hmset(`game:0:1`, { status: 'created', mode: 1});
        }

        const memeInDb = await pgdb.memeStorage.count().then(data => (data));
        console.log("Meme in DB: ", memeInDb);        
        await init();
        let lastId = + await redisHget('lastId', 0);
        let pair = await getCurrentPair();

        await sendFirstPair();
        setInterval(async function() {
            await setNewPair();
            pair = await getCurrentPair();
            await redis.publish(`action:${types.NEW_PAIR}`, JSON.stringify({ game_id: gameId, ...pair}));        
            lastId = + await redisHget('lastId', 0);    
            if(lastId + pairCount >= memeInDb.count) {
                lastId = 0;
                console.log("Memes in db is finished");
                const leftMemeImg = await redisHget(1, 1);
                const rightMemeImg = await redisHget(2, 2);
                await redis.hmset(`game:${gameId}:1`, { lastId: lastId, 
                    leftMemeId: 1,
                    leftMemeId: 2,
                    leftMemeImg: leftMemeImg,
                    rightMemeImg: rightMemeImg, });
            }
            await sendWinner(gameId);
        }, waitNextPairTimer);
    };

    return {
        gameloop: gameloop,
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
