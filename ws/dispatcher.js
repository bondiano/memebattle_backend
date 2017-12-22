const sub = require('../redis')().newRedis;
const types = require('./types');
const parseAction = msg => msg.split(':')[1];


const dispatcher = (io) => {
    console.log('DISP');
    sub.psubscribe('action*');
    sub.on('pmessage', (pattern, action, msg) => {
        console.log(`from: ${action}. msg: ${msg}, pattern: ${pattern}`);
        const data = JSON.parse(msg);
        switch (parseAction(action)){
            case types.CREATE_GAME:
                console.log('create dispatcher');
                io.emit(types.CREATE_GAME, msg);
                return;
            case types.CONNECT_TO_GAME_REQUEST:
                console.log('connect dispatcher');
                io.to(`game:${data.game_id}:${data.user_id}`).emit('action', {type: `@@ws/${types.CONNECT_TO_GAME_SUCCESS}`, data});
                return;
            case types.LEAVE_FROM_GAME:
                console.log('leave dispatcher');
                io.to(`game:${data.game_id}`).emit('action', {type: `@@ws/${types.LEAVE_FROM_GAME}`, data});
                return;
            case types.START_GAME:
                console.log('start dispatcher');
                io.to(`game:${data.game_id}`).emit('action', {type: types.START_GAME, data});                
                return;
            case types.CHOOSE_MEM_REQUEST:
                console.log('choose dispatcher');
                io.to(`game:${data.game_id}:${data.user_id}`).emit('action', {type: `@@ws/${types.CHOOSE_MEM_SUCCESS}`, data});                
                return;
            case types.GET_MEM_PAIR_REQUEST:
                console.log('get mem pair dispatcher');
                io.to(`game:${data.game_id}:${data.user_id}`).emit('action', {type:`@@ws/${types.GET_MEM_PAIR_SUCCESS}`, data});                
                return;
            case types.NEW_PAIR:
                console.log('new mem pair dispatcher');
                io.to(`game:${data.game_id}`).emit('action', {type: `@@ws/${types.NEW_PAIR}`, data});                
                return;
            case types.PAIR_WINNER:
                console.log('pair winner dispatcher');
                io.to(`game:${data.game_id}`).emit('action', {type: `@@ws/${types.PAIR_WINNER}`, data});                
                return;
        }
    });
};

module.exports = dispatcher;
