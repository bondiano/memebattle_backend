const redis = require('../redis')().redis;
const types = require('./types');
const pgdb = require('../db/pg-db');
const rules = require('./game-rules');

function initData(_data, toCheck) {
    let data = _data;
    try {
        if(typeof _data == "string"){
            data = JSON.parse(data);
        }
        toCheck && toCheck.forEach((arg) => {
            if (!data.hasOwnProperty(arg)) {
                throw new Error('props error');
            }
        });
        return data;
    }
    catch (err) {
        console.warn('initDataWSHandler', err, _data);
        return false;
    }
}

const gameInitState = (data) => ({
    status: 'created',
    ...data
});

const createGame = async function (_data) {
    console.log('CREATE_GAME', _data);    
    const data = initData(_data, ['mode']);
    const id = await pgdb.games.add(1, 1).then(answer => (answer[0].id));
    /* TODO: Change last arg for redis name */
    await redis.hmset(`game:${id}:${data.mode}`, gameInitState({mode: data.mode}));
    rules(data.mode, id).init();
    redis.publish(`action:${types.CREATE_GAME}`, JSON.stringify(id));
};

const connectToGame = (socket, _data) => {
    console.log('CONNECT_TO_GAME', _data);
    const data = initData(_data, ['user_id', 'game_id']);
    redis.hgetall(`game:${data.game_id}`).then(game => {
        socket.join(`game:${data.game_id}`);
        redis.publish('action:CONNECT_TO_GAME', JSON.stringify({...data, socketId: socket.id}));
    });
};

const leaveFromGame = (socket, _data) => {
    const data = initData(_data, ['user_id', 'game_id']);
    socket.leave(`game:${data.game_id}`);
    redis.publish('action:LEAVE_FROM_GAME', _data);
};

const chooseMem = async function (_data) {
    let data = initData(_data, ['user_id', 'right', 'mem_id', 'game_id']);
    const mode = await redis.hget(`game:${data.game_id}:1`, 'mode').then(data => (data));    
    await rules(mode, data.game_id).addMemeLikes(data.right);
    redis.publish('action:CHOOSE_MEM', _data);
};

const getMemPair = async function (_data) {
    const data = initData(_data, ['user_id', 'game_id']);
    const mode = await redis.hget(`game:${data.game_id}:1`, 'mode').then(data => (data));
    const pair = await rules(mode, data.game_id).getCurrentPair();
    redis.publish('action:GET_MEM_PAIR', JSON.stringify({...data, ...pair}));
};

const pairWinner = async function (_data) {
    const data = initData(_data, ['user_id', 'game_id']);
    const mode = await redis.hget(`game:${data.game_id}:1`, 'mode').then(data => (data));
    await rules(mode, data.game_id).getPairWinner();
};

const disconnected = () => {
    console.log('DISCONNECT');
};

const onConnect = socket => {
    console.log('Socket ID:', socket.id);
    socket.on(types.CREATE_GAME, createGame);
    socket.on(types.CONNECT_TO_GAME, connectToGame.bind(undefined, socket));
    socket.on(types.LEAVE_FROM_GAME, leaveFromGame.bind(undefined, socket));
    socket.on(types.CHOOSE_MEM, chooseMem);
    socket.on(types.GET_MEM_PAIR, getMemPair);
    socket.on(types.PAIR_WINNER, pairWinner);
    socket.on('disconnect', disconnected);
};

module.exports = (io) => {
    io.on('connection', onConnect)
};
