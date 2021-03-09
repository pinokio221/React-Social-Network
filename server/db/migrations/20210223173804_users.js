
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
        table.string('profile_image').default('https://assets.website-files.com/5cb8b10a48eebf8ee23d835b/5fa9a5aeb9e58ca6b693cc15_default-profile-picture1.jpg');
        table.string('header_image').default('https://lh3.googleusercontent.com/proxy/BnyVd5A-F_WdpM_0QUz71IJVKMJsjM2Ubg4XBCJ8QCEc31QNn7aI_MeYEIKk0apjA_0CbmsJv4cdj_uYWmwOm6PnGQz1_wfIY2hI4SZsxWeAcRz2isUE0ej45Q');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};
