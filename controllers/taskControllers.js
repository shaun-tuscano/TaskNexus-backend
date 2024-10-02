
const { addTask, modifyTask, getAllTasksForproject } = require('../models/tasksModel.js');
const {createtaskVal, updatetaskVal} = require('../validation/taskValidation.js');


const createTask = async (req,res) =>{
    try {
        const result =  await createtaskVal.validateAsync(req.body);
        const taskDetails = await addTask(req.user.id,result);
        if(taskDetails){
            return res.status(201).json({message:"task added successfully"});
        }
        res.status(500).json({message:"error while adding tasks"});    
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).json({ message: "Error adding new task", error: error.message });    
    }
};

const updateTask = async (req,res) => {
    try {
        const result = await updatetaskVal.validateAsync(req.body);
        const updatedTask = await modifyTask(req.user.id,result);
        if(updatedTask){
            return res.status(200).json({message:"task updated successfully"});
        }   
        res.status(500).json({ message: "Error while updating the task"});   
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).json({ message: "Error while updating task", error: error.message });     
    }
}


const getTasks = async(req,res) => {
    try {
        const project_id = parseInt(req.params.id);
        if(project_id && typeof(project_id)=="number"){
            const result = await getAllTasksForproject(project_id);
            if(result){
               return res.status(200).json({message:"task details",task_data:result});
            }
            return res.status(404).json({message:"could not find any task for this project"});

        }
        return res.status(400).json({message:"please provide project id"});
    } catch (error) {
        res.status(500).json({ message: "Error while getting tasks", error: error.message });     
    }
}

module.exports = {createTask,updateTask, getTasks};