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
    const data = await initData(_data, ['mode']);
    const id = await pgdb.games.add(1, 1).then(answer => (answer[0].id));
    /* TODO: Change last arg for redis name */
    await redis.hmset(`game:${id}:${data.mode}`, gameInitState({mode: data.mode}));
    redis.publish(`action:${types.CREATE_GAME}`, JSON.stringify(id));
    await rules(data.mode, id).gameloop();
};

const connectToGame = (socket, _data) => {
    console.log('CONNECT_TO_GAME', _data);
    const data = initData(_data, ['user_id', 'game_id']);
    redis.hgetall(`game:${data.game_id}`).then(game => {
        socket.join(`game:${data.game_id}`).join(`game:${data.game_id}:${data.user_id}`);
        redis.publish(`action:${types.CONNECT_TO_GAME_REQUEST}`, JSON.stringify({...data, socketId: socket.id}));
    });
};

const leaveFromGame = (socket, _data) => {
    console.log('LEAVE_FROM_GAME ', _data);
    const data = initData(_data, ['user_id', 'game_id']);
    socket.leave(`game:${data.game_id}:${data.user_id}`).leave(`game:${data.game_id}`);
    redis.publish(`action:${types.LEAVE_FROM_GAME}`, JSON.stringify({_data}));
};

const chooseMem = async function (_data) {
    let data = await initData(_data, ['user_id', 'right', 'game_id']);
    const mode = await redis.hget(`game:${data.game_id}:1`, 'mode').then(data => (data));    
    await rules(mode, data.game_id).addMemeLikes(data.right, data.user_id);
    // TODO: fix possible extra charge for 1 user
    await redis.publish(`action:${types.CHOOSE_MEM_REQUEST}`, JSON.stringify({...data, _data}));
};

const getMemPair = async function (_data) {
    const data = initData(_data, ['user_id', 'game_id']);
    const mode = await redis.hget(`game:${data.game_id}:1`, 'mode').then(data => (data));
    const pair = await rules(mode, data.game_id).getCurrentPair();
    await redis.publish(`action:${types.GET_MEM_PAIR_REQUEST}`, JSON.stringify({...data, ...pair}));
};

const disconnected = () => {
    console.log('DISCONNECT');
};

const actionsHandler = (socket, _data) => {
    let data = initData(_data, ['type']);
    switch(data.type) {
        case `@@ws/${types.CONNECT_TO_GAME_REQUEST}`:
            connectToGame(socket, _data);
            break;
        case `@@ws/${types.LEAVE_FROM_GAME}`:
            leaveFromGame(undefined, _data);
            break;
        case `@@ws/${types.CHOOSE_MEM_REQUEST}`:
            chooseMem(_data);
            break;
        case `@@ws/${types.GET_MEM_PAIR_REQUEST}`:
            getMemPair(_data);
            break;
    }
};

const onConnect = socket => {
    console.log('Socket ID:', socket.id);
    socket.on('action', actionsHandler.bind(undefined, socket));
    socket.on(types.CREATE_GAME, createGame);
    socket.on(types.CONNECT_TO_GAME, connectToGame.bind(undefined, socket));
    socket.on(types.LEAVE_FROM_GAME, leaveFromGame.bind(undefined, socket));
    socket.on(types.CHOOSE_MEM, chooseMem);
    socket.on(types.GET_MEM_PAIR, getMemPair);
    socket.on('disconnect', disconnected);
};

module.exports = (io) => {
    io.on('connection', onConnect)
};
