exports.up = function(knex) {
    return knex.schema
    .createTable('messages', (table) => {
        table.increments();
        table.integer('dialogId').unsigned().notNullable();
        table.integer('author').notNullable();
        table.text('content').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('messages')
};