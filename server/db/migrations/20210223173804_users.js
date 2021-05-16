
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
        table.increments()
        table.string('auth_id').defaultTo(null);
        table.string('login').notNullable();
        table.string('email').notNullable().unique();
        table.string('password', 500).notNullable();
        table.string('first_name').notNullable().default("Alex");
        table.string('last_name').notNullable().default("Menco");
        table.string('fullname').notNullable().default("Alex Menco");
        table.enu('gender',[0, 1]).notNullable().default(0);
        table.string('status').defaultTo(null);
        table.date('birthday').notNullable().defaultTo('1992-12-10');
        table.date('registered_date').notNullable().defaultTo('1992-12-10');
        table.integer('age').notNullable().defaultTo(23);
        table.string('country').notNullable().default('Ukraine');
        table.string('city').notNullable().default('Kyiv');
        table.string('profile_image').default('http://localhost:9000/images/profile_pictures/avatar_default.jpg');
        table.string('header_image').default('http://localhost:9000/images/cover_pictures/cover_default.jpg');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};
