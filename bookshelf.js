
var bookshelf = require('bookshelf');
var knex = require('knex')(require('./knexfile')['development']);

var bs = bookshelf(knex);
bs.plugin('registry');

module.exports = bs;
