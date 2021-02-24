const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        login: Joi.string().min(6).required(),
        email:  Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        /*first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        gender: Joi.string().min(1).max(1).required(),
        birthday: Joi.date().required(),
        city: Joi.string().min(3).max(20).required()*/
    }
    return Joi.validate(data, schema)
}


module.exports.registerValidation = registerValidation;
