const applyHandlers = (handlers) =>
    handlers.reduce((acc, cur) => {
        return {...acc, ...cur};
    }, {});

module.exports = applyHandlers;
