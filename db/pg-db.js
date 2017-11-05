require('dotenv').config({path: '../config/.env'});
const repos = require('./repos'); // loading all repositories

// pg-promise initialization options:
const initOptions = {
        // Extending the database protocol with our custom repositories;
        // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
        extend(obj, dc) {
            obj.users = new repos.Users(obj, pgp);
        }
    };
    
// Database connection parameters:
const config = {
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASS
};

// Loading and initializing the library:
const pgp = require('pg-promise')(initOptions);

// Creating a new database instance from the connection details:
const db = pgp(config);

// Load and initialize optional diagnostics:
const diagnostics = require('./diagnostics');
diagnostics.init(initOptions);

// Exporting the database object for shared use:
module.exports = db;