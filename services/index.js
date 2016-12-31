
var _         = require('lodash'),
    carousel  = require('./carousel'),
    bulletins = require('./bulletins'),
    users     = require('./users'),
    bets      = require('./bets');

/**
 * ## Public API
 */
module.exports = {
    // Service Endpoints
    users : users,
    bets  : bets,
    carousel: carousel,
    bulletins: bulletins
};
