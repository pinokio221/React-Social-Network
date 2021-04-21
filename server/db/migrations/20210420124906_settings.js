exports.up = function(knex) {
    return knex.schema
    .createTable('settings', (table) => {
        table.increments();
        table.integer('userId').notNullable();
        table.boolean('2fa').notNullable().default(true);
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('settings')
};
