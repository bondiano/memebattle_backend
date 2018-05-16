const extractValidationType = (errors) => {
    if (errors.details) {
        return errors.details // For JOI errors
            .map(validation => ({path: validation.path, message: validation.message}));
    }
    return errors
        .map(validation => ({path: validation.path, message: validation.message}));
};

module.exports = extractValidationType;
