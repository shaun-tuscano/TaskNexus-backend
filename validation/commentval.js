const Joi = require('joi');


const createCommentVal = Joi.object({
    task_id:Joi.number().required(),
    comment:Joi.string().required(),
});



module.exports = {
    createCommentVal
}