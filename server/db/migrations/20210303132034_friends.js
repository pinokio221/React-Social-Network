exports.up = function(knex) {
    return knex.schema
    .createTable('friends', (table) => {
        table.increments();
        table.integer('userId1').notNullable();
        table.integer('userId2').notNullable();
        table.integer('status').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('friends')
};
