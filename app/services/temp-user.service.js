const { crypt } = require('@utils');
const { tempUser: tempUserJob } = require('@jobs');
const { TempUser: tempUserModel } = require('@models');

const createTempUser = async (identifier, socketId) => {
    const salt = await crypt.genSalt(10);
    const cryptedToken = await crypt.hash(identifier, salt);
    const user = await tempUserModel.create({token: cryptedToken, socketId});
    tempUserJob.RemoveTempUserAfterDay(user);
    return user.save();
};

module.exports = {
    createTempUser,
};
