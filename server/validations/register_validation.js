const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        fullname: Joi.string().min(3).required(),
        login: Joi.string().min(6).required(),
        email:  Joi.string().min(6).required().email(),
        gender: Joi.string().min(1).max(1).required(),
        birthday: Joi.date().required(),
        age: Joi.number().required(),
        password: Joi.string().min(6).required(),
        //city: Joi.string().min(3).max(20).required()
    }
    return Joi.validate(data, schema)
}


module.exports.registerValidation = registerValidation;
