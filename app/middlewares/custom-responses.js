const customResponses = {
    success(payload) {
        return this.status(200).json({
            success: true,
            payload
        });
    },

    unauthorized() {
        return this.status(401).json({
            success: false,
            error: 'unauthorized'
        });
    }
};

module.exports = (req, res, next) => {
    Object.assign(res, customResponses);
    next();
};
