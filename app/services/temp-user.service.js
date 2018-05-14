const {tempUser: model} = require('@models/');

const createTempUser = async (identifier, socketId) => {
    const user = await model.create({token: identifier, socket_id: socketId});
    return user.save();
};

module.exports = {
    createTempUser,
};
