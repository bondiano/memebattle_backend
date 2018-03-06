const
    Bookshelf = require('bookshelf'),
    Knex = require('knex'),
    dbConfig = require('../config/db');

const knex = Knex(dbConfig);
const bookshelf = Bookshelf(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;