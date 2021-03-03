const knex = require('knex');
const knexConfig = require('../db/knexfile');
const { Model } = require('objection');

Model.knex(knex(knexConfig.development));

class Friend extends Model {
    static get tableName() {
        return 'friends';
    }
}

module.exports = Friend;