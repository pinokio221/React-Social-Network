
exports.up = function(knex) {
    return knex.schema
    .createTable('dialogs', (table) => {
        table.increments();
        table.enu('status',['0', '1']).notNullable().default('0');
        table.integer('sendId').notNullable();
        table.integer('receiveId').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('dialogs')
};
