const knex = require('knex');
const knexConfig = require('../db/knexfile');
const { Model } = require('objection');

Model.knex(knex(knexConfig.development));

class Message extends Model {
    static get tableName() {
        return 'messages';
    }
}

module.exports = Message;