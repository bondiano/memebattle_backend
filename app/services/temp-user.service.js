const { crypt } = require('@utils');
const { tempUser: tempUserJob } = require('@jobs');
const { tempUser: tempUserRepo } = require('@repo');
const { TempUser: tempUserModel } = require('@models');

const createTempUser = async (identifier, socketId) => {
    const salt = await crypt.genSalt(10);
    const cryptedToken = await crypt.hash(identifier, salt);
    const user = await tempUserModel.create({token: cryptedToken, socketId});

    // Create worker for delete temp user after one day
    tempUserJob.RemoveTempUserAfterDay(user);
    return user.save();
};

const updateUserSocketId = async (identifier, socketId) => {
    const user = await tempUserRepo.getById(identifier);

    // Update worker for delete temp user after one day
    tempUserJob.DeferRemoveTempUser(user);
    return user
        .update({ socketId });
};

module.exports = {
    createTempUser,
    updateUserSocketId,
};
