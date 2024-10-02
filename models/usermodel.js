const pool = require('../database/config.js');

const findUserByEmail = async (gmail) => {
    const res = await pool.query('SELECT * FROM users WHERE gmail = $1', [gmail]);
    return res.rows[0];
};

const findUserByUserName = async (username) => {
    const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return res.rows[0];
};


const createUser = async (userData) => {
    const { username, password, gmail } = userData;
    const res = await pool.query(
        'INSERT INTO users (username, password, gmail) VALUES ($1, $2, $3) RETURNING *',
        [username, password, gmail]
    );
    return res.rows[0]; 
};

const getAllUsers =  async () =>{
    const res =  await pool.query('SELECT user_id,username FROM users');
    return res.rows;
}

module.exports = {
    findUserByEmail,
    createUser,
    findUserByUserName,
    getAllUsers
};