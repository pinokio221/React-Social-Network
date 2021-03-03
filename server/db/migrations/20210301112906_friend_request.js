exports.up = function(knex) {
    return knex.schema
    .createTable('friend_requests', (table) => {
        table.increments();
        table.integer('from_id').notNullable();
        table.integer('to_id').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('friend_requests')
};
