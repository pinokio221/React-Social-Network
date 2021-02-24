
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
        table.increments()
        table.string('login').notNullable();
        table.string('email').notNullable().unique();
        table.string('password', 500).notNullable();
        table.string('first_name').notNullable().default("Alex");
        table.string('last_name').notNullable().default("Menco");
        table.string('fullname').notNullable().default("Alex Menco");
        table.enu('gender',['M', 'F']).notNullable().default('M');
        table.string('status').defaultTo(null);
        table.date('birthday').notNullable().defaultTo('1992-12-10');
        table.date('registered_date').notNullable().defaultTo('1992-12-10');
        table.integer('age').notNullable().defaultTo(23);
        table.string('city').notNullable().default('Kyiv');
        table.string('profile_image').default(null);
        table.string('header_image').default(null);
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};
