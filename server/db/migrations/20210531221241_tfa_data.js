exports.up = function(knex) {
    return knex.schema
    .createTable('tfa_data', (table) => {
        table.increments();
        table.integer('userId', 20)
        table.string('secret_id', 500)
        table.string('temp_secret', 500)
        table.string('secret', 500)
        table.string('otpauth_url', 500)

    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('tfa_data')
};
