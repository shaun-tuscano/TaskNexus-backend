const pool = require('../database/config.js');


const createComment = async (user_id,commentDetails) =>{
    const {comment,task_id} = commentDetails;
    const res = await pool.query('INSERT INTO public.comments (task_id, user_id, comment) VALUES ($1, $2, $3) returning *;',[task_id,user_id,comment]);
    return res.rows[0];
};


module.exports = {
    createComment,
}