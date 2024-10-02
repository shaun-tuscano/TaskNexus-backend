const pool = require('../database/config.js');


const addProject = async(user_id,project_name) =>{
    const res = await pool.query('INSERT INTO projects (user_id, project_name) VALUES ($1,$2) RETURNING *;', [user_id,project_name]);
    return res.rows[0];
};

const findProjectsForuser = async (user_id) =>{
    const res = await pool.query('SELECT p.project_id, p.project_name FROM projects p WHERE p.project_id IN ( SELECT unnest(u.project_access)  FROM users u  WHERE u.user_id = $1);', [user_id]);
    return res.rows;
}

const updateUserProjectAccess = async (user_id,project_id) =>{
    const res = await pool.query(' UPDATE public.users SET project_access = array_append(project_access, $1) WHERE user_id = $2 RETURNING *;', [project_id,user_id]);
    return res.rows[0];
}

const checkProjectExist = async (user_id,project_id) =>{
    const res = await pool.query(' SELECT EXISTS (SELECT 1 FROM public.users  WHERE user_id = $1  AND $2 = ANY(project_access));', [user_id,project_id]); 
    return res.rows[0]; 
}


module.exports ={
    addProject,
    findProjectsForuser,
    updateUserProjectAccess,
    checkProjectExist
}