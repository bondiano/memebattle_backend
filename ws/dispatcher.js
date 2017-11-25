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
                console.log('create dispatch');
                io.emit(types.CREATE_GAME, data);
                return;
            case types.CONNECT_TO_GAME:
                console.log('connect dispatch');
                io.to(`game:${data.game_id}`).emit(types.CONNECT_TO_GAME, msg);
                return;
            case types.LEAVE_FROM_GAME:
                console.log('leave dispatch');
                io.to(`game:${data.game_id}`).emit(types.LEAVE_FROM_GAME, msg);
                return;
            case types.START_GAME:
                console.log('start dispatch');
                io.to(`game:${data.game_id}`).emit(types.START_GAME, msg);
                return;
            case types.CHOOSE_MEM:
                console.log('choose dispatch');
                io.to(`game:${data.game_id}`).emit(types.CHOOSE_MEM, msg);
        }
    });
};

module.exports = dispatcher;
