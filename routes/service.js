/* There will be plased service routes, all of this routes must be turned off in production
    /user/create GET - for fast create user table by user repository model
    /user/drop GET - for fast drop user table by user repository model
*/

module.exports = (app, db) => {

    
    if (app.get('env') === 'development') {
        GET('/users/create', () => db.users.create());
        GET('/users/drop', () => db.users.drop());
    }
};