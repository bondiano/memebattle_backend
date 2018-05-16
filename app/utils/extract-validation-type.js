const extractValidationType = (_errors) => {
    const errors = _errors && _errors.details;
    return errors && errors
        .map(validation => ({path: validation.path, message: validation.message}));
};

module.exports = extractValidationType;
