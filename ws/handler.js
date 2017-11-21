const redis = require('../redis')().redis;
const types = require('./types');
const pgdb = require('../db/pg-db');

const createGame = async function (data) {
    const id = await pgdb.games.add(1, 1).then(answer => (answer[0].id));
    console.log(id);
    await redis.hmset(`game:${id}:${data.type}`, {status: 'created', mode: data.mode});
    redis.publish(`action:${types.CREATE_GAME}`, JSON.stringify(id));
};


const onConnect = socket => {
    socket.on(types.CREATE_GAME, createGame);
    socket.on(types.CONNECT_TO_GAME, (_data) => {
        console.log('CONNECT_TO_GAME', _data);
        let data = undefined;
        try{
            data = JSON .parse(_data);
        }
        catch (err){
            console.warn('CONNECT_TO_GAME', err, _data);
            return;
        }

        if (!data.user_id || !data.game_id) {
            return;
        }
        socket.join(`game:${data.game_id}`);
        redis.publish('action:CONNECT_TO_GAME', JSON.stringify({...data, socketId: socket.id}));
    });
    socket.on(types.LEAVE_FROM_GAME, (_data) => {
        let data = undefined;
        try{
            data = JSON.parse(_data);
            if (!data.user_id || !data.game_id) {
                return;
            }
        }
        catch (err){
            console.warn('CONNECT_TO_GAME', err, _data);
            return;
        }
        socket.leave(`game:${data.game_id}`);
        redis.publish(types.LEAVE_FROM_GAME, _data);
    });
    socket.on(types.CHOOSE_MEM, _data => {
        let data = undefined;
        try{
            data = JSON.parse(_data);
            if (!data.user_id || !data.game_id || !data.mem_id) {
                return;
            }
        }
        catch (err){
            console.warn('types.CHOOSE_MEM', err, _data);
            return;
        }
        console.log('types.CHOOSE_MEM');
        redis.publish('action:CHOOSE_MEM', _data);
    });
    socket.on('disconnect', () => {
        console.log('DISCONNECT')
    });
};

module.exports = (io) => {
    io.on('connection', onConnect)
};
