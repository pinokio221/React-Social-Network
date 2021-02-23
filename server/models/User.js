const knex = require('knex');
const knexConfig = require('../db/knexfile');
const { Model } = require('objection');

Model.knex(knex(knexConfig.development));

class User extends Model {
    static get tableName() {
        return 'users';
    }
}

module.exports = User;