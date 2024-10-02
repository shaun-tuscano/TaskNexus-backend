const express =  require('express');
const router = express.Router();
const {getUserProjects,createProject , giveProjectAccess} = require('../controllers/projectControllers.js');
const { getUsers} = require('../controllers/usercontroller.js');
const {createTask, updateTask, getTasks} = require('../controllers/taskControllers.js');
const { addComments } = require('../controllers/commentsControllers.js');

//get all projects which user has access to.
router.get('/projects',getUserProjects);

//create a project
router.post('/addproject',createProject);

//get list of all users
router.get('/allusers',getUsers);

//provide project access to a user
router.patch('/projectaccess',giveProjectAccess);

//routes for tasks
//add a new task
router.post('/addtask',createTask);

//get all tasks in a project
router.get('/gettasks/:id',getTasks);

//update a task
router.put('/updatetask',updateTask);

//routes for comments
router.post('/comment',addComments);



module.exports = router;