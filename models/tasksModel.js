const pool = require('../database/config.js');


const addTask = async (user_id,taskDetails) => {
    const {project_id,task_title,task_description,priority,assigned_to,} = taskDetails;
    const res = await pool.query('INSERT INTO public.tasks (created_by, project_id, task_title, task_description, assigned_to, priority) VALUES ($1, $2, $3, $4, $5, $6) returning *;',[user_id,project_id,task_title,task_description,assigned_to,priority]);
    return res.rows[0];
};

const modifyTask = async (modified_by,taskDetails) => {
    const {task_title,task_description,assigned_to,priority,task_status,task_id} = taskDetails;
    const res =  await pool.query('UPDATE public.tasks SET task_title = $1, task_description = $2, assigned_to = $3, priority = $4, task_status = $5, modified_by = $6 WHERE task_id = $7 returning *;',[task_title,task_description,assigned_to,priority,task_status,modified_by,task_id]);
    return res.rows[0];
}

const getAllTasksForproject = async (project_id) => {
    const res = await pool.query('SELECT * From public.tasks WHERE project_id = $1',[project_id]);
    return res.rows;
}


module.exports = {
    addTask,  
    modifyTask, 
    getAllTasksForproject 
};
