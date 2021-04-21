
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
        table.enu('gender',['M', 'F']).notNullable().default('M');
        table.string('status').defaultTo(null);
        table.date('birthday').notNullable().defaultTo('1992-12-10');
        table.date('registered_date').notNullable().defaultTo('1992-12-10');
        table.integer('age').notNullable().defaultTo(23);
        table.string('country').notNullable().default('Ukraine');
        table.string('city').notNullable().default('Kyiv');
        table.boolean('verified').notNullable().default(false);
        table.string('profile_image').default('https://assets.website-files.com/5cb8b10a48eebf8ee23d835b/5fa9a5aeb9e58ca6b693cc15_default-profile-picture1.jpg');
        table.string('header_image').default('https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};
