const dotenv = require('dotenv').config();

module.exports  = { // FIX THAT!!!
    development: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'Ogurec_22',
            database : 'social_network',
            charset : 'utf8mb4'
    },
        migrations: {
            tableName: 'knex_migrations'
            },
        },
        seeds: {
            directory: './seeds'
        }
    
}
    