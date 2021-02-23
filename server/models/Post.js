const knex = require('knex');
const knexConfig = require('../db/knexfile');
const { Model } = require('objection');

Model.knex(knex(knexConfig.development));

class Post extends Model {
    static get tableName() {
        return 'posts';
    }
}

module.exports = Post;