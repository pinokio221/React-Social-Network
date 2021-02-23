
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
        table.increments()
        table.string('login').notNullable();
        table.string('email').notNullable().unique();
        table.string('password', 500).notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('fullname').notNullable();
        table.enu('gender',['M', 'F']).notNullable();
        table.string('status').defaultTo(null);
        table.date('birthday').notNullable().defaultTo('1992-12-10');
        table.date('registered_date').notNullable().defaultTo('1992-12-10');
        table.integer('age').notNullable().defaultTo(23);
        table.string('phone_number').notNullable().default('38067948885').unique();
        table.string('city').notNullable().default('Kyiv');
        table.string('profile_image').default(null);
        table.string('header_image').default(null);
        table.timestamps(true, true);
    })
    .createTable('posts', (table) => {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id')
            .references('users.id')
            .onDelete('CASCADE')
        table.text('content').notNullable();
        table.integer('likes').notNullable().default(0);
        table.integer('comments').notNullable().default(0);
        table.integer('reposts').notNullable().default(0);
        table.timestamps(true, true);
    })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('posts');
};
