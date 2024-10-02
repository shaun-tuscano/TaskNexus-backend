const Joi = require('joi');


const createprojectValidation = Joi.object({
    project_name: Joi.string().min(4).max(30).required(),
});


module.exports = {
    createprojectValidation,
}