
exports.up = function(knex) {
    return knex.schema
    .createTable('posts', (table) => {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id')
            .references('id').inTable('users')
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
    .dropTableIfExists('posts')
};
