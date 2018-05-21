const Joi = require('joi');

const { Observable } = require('rxjs');

const validatorOperator = (schema) => (source) =>
    Observable.create(subscriber => {
        const subscription = source.subscribe(data => {
            try {
                const {error, value} = Joi.validate(data, schema);
                if(error) {
                    return subscriber.next({...value, error});
                }
                return subscriber.next(value);
            } catch(err) {
                subscriber.error(err);
            }
        },
        err => subscriber.error(err),
        () => subscriber.complete());
        return subscription;
    });

module.exports = validatorOperator;
