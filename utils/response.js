var Promise  = require('bluebird'),
    util     = require('util'),
    NBLError = require('../common/error');


/**
 * [response description]
 * @param  {[type]} resp [description]
 * @return {[type]}      [description]
 */
function response(service) {
    return function(req, res, next) {
        // cors
        res.header({
            'Access-Control-Allow-Origin': '*'
        });

        Promise.method(function() {
            return service(req);
        })().then(function(data) {
            res.json(data);
        }).catch(NBLError, function(e) {
            res.status(e.errno.toString().substr(0, 3)).json({
                errno : e.errno,
                message: e.message
            });
        }).catch(function(e) {
            res.status(500).json(util.inspect(e));
        });
    }
}

module.exports = response;
