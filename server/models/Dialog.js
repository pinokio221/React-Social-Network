const knex = require('knex');
const knexConfig = require('../db/knexfile');
const { Model } = require('objection');

Model.knex(knex(knexConfig.development));

class Dialog extends Model {
    static get tableName() {
        return 'dialogs';
    }
}

module.exports = Dialog;