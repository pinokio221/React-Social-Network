const knex = require('knex');
const knexConfig = require('../db/knexfile');
const { Model } = require('objection');

Model.knex(knex(knexConfig.development));

class Setting extends Model {
    static get tableName() {
        return 'settings';
    }
}

module.exports = Setting;