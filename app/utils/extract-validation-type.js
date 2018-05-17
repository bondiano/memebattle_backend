const extractValidationType = (_errors) => {
    let errors;

    if(_errors.errors) { // For sequalize errors
        errors = _errors.errors
    }

    if(_errors.details) { // For JOI errors
        errors = _errors.details
    }

    return errors && errors
        .map(validation => ({path: validation.path, message: validation.message}));
};

module.exports = extractValidationType;
