var Promise         = require('bluebird'),
    util            = require('util'),
    _               = require('lodash'),
    defs            = require('../common/defs'),
    logger          = require('../common/logger'),
    jwt             = require('jsonwebtoken');

var auth = {
  check : function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, defs.AUTH_TOKEN, function(err, decoded) {      
        if (err) {
          return res.status(403).json({
            errno : 40300,
            message : 'auth failed.'
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          logger.debug('decoded:', decoded);
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).json({
        errno : 40300,
        message: 'No token provided.'
      });
    }
  }
}

module.exports = auth;
