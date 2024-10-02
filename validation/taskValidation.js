const Joi = require('joi');


const createtaskVal = Joi.object({
    project_id: Joi.number().required(),
    task_title:Joi.string().min(3).max(50).required(),
    task_description:Joi.string(),
    assigned_to:Joi.number().required(),
    priority:Joi.number().min(0).max(4).default(4).required(),
});

const updatetaskVal = Joi.object({
    task_id:Joi.number().required(),
    task_title:Joi.string().min(3).max(50).required(),
    task_description:Joi.string(),
    assigned_to:Joi.number().required(),
    priority:Joi.number().min(0).max(4).default(4).required(),
    task_status:Joi.number().min(1).max(3).default(1),
});


module.exports = {
    createtaskVal,
    updatetaskVal

}