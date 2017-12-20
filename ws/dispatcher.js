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
                io.emit(types.CREATE_GAME, data);
                return;
            case types.CONNECT_TO_GAME:
                console.log('connect dispatcher');
                io.to(`game:${data.game_id}`).emit(types.CONNECT_TO_GAME, msg);
                return;
            case types.LEAVE_FROM_GAME:
                console.log('leave dispatcher');
                io.to(`game:${data.game_id}`).emit(types.LEAVE_FROM_GAME, msg);
                return;
            case types.START_GAME:
                console.log('start dispatcher');
                io.to(`game:${data.game_id}`).emit(types.START_GAME, msg);
                return;
            case types.CHOOSE_MEM:
                console.log('choose dispatcher');
                io.to(`game:${data.game_id}`).emit(types.CHOOSE_MEM, msg);
                return;
            case types.GET_MEM_PAIR:
                console.log('get mem pair dispatcher');
                io.to(`game:${data.game_id}`).emit(types.GET_MEM_PAIR, msg);
                return;
            case types.PAIR_WINNER:
                console.log('pair winner dispatcher');
                io.to(`game:${data.game_id}`).emit(types.PAIR_WINNER, msg);
                return;
        }
    });
};

module.exports = dispatcher;
