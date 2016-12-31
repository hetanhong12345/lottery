var users = require('./users');
var auths = require('./auths');
var bets = require('./bets');
var carousel = require('./carousel');
var bulletins = require('./bulletins');

exports.init = function(app) {
	app.use('/users', users);
	app.use('/auths', auths);
	app.use('/bets', bets);
    app.use('/carousel', carousel);
    app.use('/bulletins', bulletins);
}
