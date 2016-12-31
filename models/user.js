
var bookshelf = require('../bookshelf');

var User = bookshelf.Model.extend({
    tableName : 'users',
    hasTimestamps : true,
    /**
     * ## Add
     * Naive user add
     * Hashes the password provided before saving to the database.
     *
     * @param {object} data
     * @param {object} options
     * @extends ghostBookshelf.Model.add to manage all aspects of user signup
     * **See:** [ghostBookshelf.Model.add](base.js.html#Add)
     */
    add: function add(data, options) {
        var self = this;

        return User.forge({
			mobile : data.mobile,
			province : '1'
		}).save()
        /*
		.then(function(user) {
			return user;
		}).catch(function(err) {

		  console.error(err);

		});
		*/
    },
	getByMobile: function getByMobile(mobile, options) {
	    options = options || {};
	    // We fetch all users and process them in JS as there is no easy way to make this query across all DBs
	    // Although they all support `lower()`, sqlite can't case transform unicode characters
	    // This is somewhat mute, as validator.isEmail() also doesn't support unicode, but this is much easier / more
	    // likely to be fixed in the near future.
	    options.require = true;

	    return Users.forge(options).fetch(options).then(function then(users) {
	        var userWithMobile = users.find(function findUser(user) {
	            return user.get('mobile') === mobile;
	        });
	        if (userWithMobile) {
	            return userWithMobile;
	        }
	    });
	},
    auth : function() {
    	return this.hasOne('Auth');
    }
});

/*
User.forge({
	id_card : '142432197511120010',
	name : 'renrong',
	gender : 1,
	birthday : new Date('1975-11-12'),
	nick : '荣耀',
	mobile : '13511031504',
	email : 'rrnn97@qq.com',
	province : '1',
	city : '2'
}).save().then(function(user) {

  console.logs(user.toJSON());

}).catch(function(err) {

  console.error(err);

});

User.where('id', 1).fetch().then(function(user) {

  console.logs(user.toJSON());

}).catch(function(err) {

  console.error(err);

});
*/

var Users = bookshelf.Collection.extend({
  model: User
});

bookshelf.model('User', User);
bookshelf.collection('Users', Users);

module.exports = {
	User : User,
	Users : Users
}
