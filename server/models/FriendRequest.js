const knex = require('knex');
const knexConfig = require('../db/knexfile');
const { Model } = require('objection');

Model.knex(knex(knexConfig.development));

class FriendRequest extends Model {
    static get tableName() {
        return 'friend_requests';
    }
}

module.exports = FriendRequest;