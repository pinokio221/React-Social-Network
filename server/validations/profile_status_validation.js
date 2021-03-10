const Joi = require('@hapi/joi');

const profile_status_validation = data => {
    const schema = {
        status: Joi.string().allow('')
    }
    return Joi.validate(data, schema)
}
module.exports.profile_status_validation = profile_status_validation;