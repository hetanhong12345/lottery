
var bookshelf = require('../bookshelf');

var Auth = bookshelf.Model.extend({
    tableName : 'auths',
    hasTimestamps : true,

    user : function() {
    	return this.belongsTo('User');
    }
});

var Auths = bookshelf.Collection.extend({
  model: Auth
});

bookshelf.model('Auth', Auth);
bookshelf.collection('Auths', Auths);

module.exports = {
	Auth : Auth,
	Auths : Auths
}
