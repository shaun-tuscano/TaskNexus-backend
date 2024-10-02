const Joi = require('joi');


const projectAccessVal = Joi.object({
    project_id:Joi.number().required(),
    user_id:Joi.number().required(),

});


module.exports = {
    projectAccessVal,
}