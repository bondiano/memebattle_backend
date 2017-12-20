const redis = require('../redis')().redis;
const types = require('./types');
const pgdb = require('../db/pg-db');
const initRules = require('./game-rules');

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
    await redis.hmset(`game:${id}:${data.mode}`, gameInitState({mode: data.mode}));
    redis.publish(`action:${types.CREATE_GAME}`, JSON.stringify(id));
    initRules(data.mode, id);
};

const connectToGame = (socket, _data) => {
    console.log('CONNECT_TO_GAME', _data);
    const data = initData(_data, ['user_id', 'game_id']);
    socket.join(`game:${data.game_id}`);
    redis.publish('action:CONNECT_TO_GAME', JSON.stringify({...data, socketId: socket.id}));
};

const leaveFromGame = (socket, _data) => {
    const data = initData(_data, ['user_id', 'game_id']);
    socket.leave(`game:${data.game_id}`);
    redis.publish('action:LEAVE_FROM_GAME', _data);
};

const chooseMem = _data => {
    let data = initData(_data, ['user_id', 'mem_id', 'game_id']);
    redis.publish('action:CHOOSE_MEM', _data);
};

const getMemPair = () => {
    
};

const pairWinner = () => {

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
