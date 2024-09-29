const joi = require('joi');

exports.insertUserValidation =joi.object({
    rolId:joi.number().required(),
    firstName:joi.string().max(255).required(),
    lastName:joi.string().max(255).required(),
    email:joi.string().email().required(),
    password:joi.string().required()
})

exports.userLoginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})