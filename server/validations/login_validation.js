const Joi = require('@hapi/joi');

const loginValidation = data => {
    const schema = {
        login: Joi.string().min(6).required().error((errors) => {
            return errors.map(error => {
              switch (error.type) {
                case "string.min":
                  return { message: `Field login should have a minumum length of 6` };
              }
            }
            )
          }),
        password: Joi.string().min(6).required().error((errors) => {
            return errors.map(error => {
              switch (error.type) {
                case "string.min":
                  return { message: `Field password should have a minumum length of 6` };
              }
            }
            )
          })
    }
    return Joi.validate(data, schema)
}



module.exports.loginValidation = loginValidation;