const extractValidationType = (errors) => {
    return errors.details
        .map(validation => ({path: validation.path, message: validation.message}));
};

module.exports = extractValidationType;
