require('dotenv').config({ path: '../.env' })


module.exports  = { 
    development: {
        client: 'pg',
        connection: {
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME,
            port: process.env.DB_PORT,
            charset : 'utf8mb4',
            //ssl: { rejectUnauthorized: false }
    },
        migrations: {
            tableName: 'knex_migrations'
            },
        seeds: {
            directory: './seeds'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL, // env var
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_migrations'
        }
      
}
    