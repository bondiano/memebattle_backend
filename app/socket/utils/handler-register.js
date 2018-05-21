
const applyMiddlewares = (middlewares, handler) => (data) => {
    let finalData = data;

    const next = (newData) => {
        finalData = newData || finalData;
    };
    if (Array.isArray(middlewares)) {
        middlewares.forEach(middleware => {
            middleware(data, next);
        });
    } else {
        middlewares(data, next);
    }

    return handler(finalData);
};

const handlerRegister = (TYPE, middlewares, handler) => {
    if (!middlewares) {
        throw new Error('Expected two or three arguments');
    }

    if (!handler) {
        handler = middlewares;
    } else {
        handler = applyMiddlewares(middlewares, handler);
    }

    return {
        [TYPE]: handler,
    };
};

module.exports = handlerRegister;
