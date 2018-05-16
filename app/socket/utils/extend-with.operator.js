const { Observable } = require('rxjs');

/**
 * Add new data to listeners value
 * @param {Object} data
 */
const extendWithOperator = (data) => (source) =>
    Observable.create(subscriber => {
        const subscription = source.subscribe(_data => {
            try {
                return subscriber.next({..._data, ...data});
            } catch(err) {
                subscriber.error(err);
            }
        },
        err => subscriber.error(err),
        () => subscriber.complete());
        return subscription;
    });

module.exports = extendWithOperator;
