const redis = require('../redis')().redis;
const types = require('./types');
const pgdb = require('../db/pg-db');

function initData(_data, toCheck) {
    let data = undefined;
    try {
        data = JSON.parse(_data);
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

const createGame = async function (_data) {
    const data = initData(_data, ['mode']);
    const id = await pgdb.games.add(1, 1).then(answer => (answer[0].id));
    await redis.hmset(`game:${id}:${data.mode}`, {status: 'created', mode: data.mode});
    redis.publish(`action:${types.CREATE_GAME}`, JSON.stringify(id));
};

const connectToGame = (socket, _data) => {
    console.log('CONNECT_TO_GAME', _data);
    const data = initData(_data, ['user_id', 'data.game_id']);
    socket.join(`game:${data.game_id}`);
    redis.publish('action:CONNECT_TO_GAME', JSON.stringify({...data, socketId: socket.id}));
};

const leaveFromGame = (socket, _data) => {
    const data = initData(_data, ['user_id', 'game_id']);
    socket.leave(`game:${data.game_id}`);
    redis.publish(types.LEAVE_FROM_GAME, _data);
};

const chooseMem = _data => {
    let data = initData(_data, ['user_id', 'mem_id', 'game_id']);
    redis.publish('action:CHOOSE_MEM', _data);
};

const onConnect = socket => {
    socket.on(types.CREATE_GAME, createGame);
    socket.on(types.CONNECT_TO_GAME, connectToGame.bind(undefined, socket));
    socket.on(types.LEAVE_FROM_GAME, leaveFromGame.bind(undefined, socket));
    socket.on(types.CHOOSE_MEM, chooseMem);
    socket.on('disconnect', () => {
        console.log('DISCONNECT')
    });
};

module.exports = (io) => {
    io.on('connection', onConnect)
};
