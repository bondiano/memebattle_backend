const { crypt } = require('@utils');
const { tempUser: tempUserJob } = require('@jobs');
const { tempUser: tempUserModel } = require('@models');

const createTempUser = async (identifier, socketId) => {
    const salt = await crypt.genSalt(10);
    const cryptedToken = await crypt.hash(identifier, salt);
    const user = await tempUserModel.create({token: cryptedToken, socket_id: socketId});
    tempUserJob.RemoveTempUserAfterDay(user);
    return user.save();
};

module.exports = {
    createTempUser,
};
