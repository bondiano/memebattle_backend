const { TempUser: TempUserModel } = require('@models');

const getById = (id) => {
    return TempUserModel.findById(id);
};

const destroyById = async (id) => {
    const user = await getById(id);
    return user.destroy();
};

module.exports = {
    getById,
    destroyById,
};
