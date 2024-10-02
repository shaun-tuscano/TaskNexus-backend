const Joi = require('joi');


const signValidation = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    gmail: Joi.string().email().required(),
});

const loginValidation = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password:Joi.string().min(6).required(),
});

module.exports = {signValidation, loginValidation};