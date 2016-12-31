
exports.up = function(knex, Promise) {

    return Promise.all([
        knex.schema.createTable('users', function(table){
            table.increments('id').primary();
            table.string('id_card');
            table.string('name');
            table.integer('gender');
            table.dateTime('birthday');
            table.string('nick');
            table.string('mobile');
            table.string('email');
            table.string('province');
            table.string('city');
            table.timestamps();
        }),

        knex.schema.createTable('auths', function(table) {
            table.increments('id').primary();
            table.integer('type');
            table.string('open_id');
            table.unique(['type', 'open_id']);
            table.string('credential');
            table.integer('user_id')
            	 .unsigned()
            	 .references('id')
            	 .inTable('users');
            table.timestamps();
        })

    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('auths'),
        knex.schema.dropTable('users')
    ])
};
