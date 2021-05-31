const knex = require('knex');
const knexConfig = require('../db/knexfile');
const { Model } = require('objection');

Model.knex(knex(knexConfig.development));

class Tfa extends Model {
    static get tableName() {
        return 'tfa_data';
    }
}

module.exports = Tfa;