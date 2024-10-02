const pool = require('../database/config.js');
const {createprojectValidation} = require('../validation/projectvalidaion.js');
const {projectAccessVal} = require('../validation/projectAccessVal.js');
const {addProject, findProjectsForuser, updateUserProjectAccess, checkProjectExist} = require('../models/projectsmodel.js');


const getUserProjects = async (req,res) => {
    try {
        
        const result = await findProjectsForuser(req.user.id);

        if(result){
           return  res.status(200).json({message:"fetched list of projects successfully",project_data:result});  
        }

        res.status(404).json({message:"no projects found"});

    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).json({ message: "Error registering user", error: error.message });     
    }
};

const createProject = async (req,res) =>{
    try {
        const value = await createprojectValidation.validateAsync(req.body);

        const result = await addProject(req.user.id,value.project_name);
        if(result){
            const updateUser = await updateUserProjectAccess(req.user.id, result.project_id);
            res.status(201).json({message:"project added successfully"});
        }
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).json({ message: "Error adding project", error: error.message }); 
    }
}


const giveProjectAccess = async (req,res) =>{
    try {
       const value = await projectAccessVal.validateAsync(req.body);
       const projectExist = await checkProjectExist(value.user_id,value.project_id);
       if(projectExist.exists){
            return res.status(409).json({message:"user already has access"});
       }

       const result = await updateUserProjectAccess(value.user_id,value.project_id);
       if(result){
            return res.status(200).json({message:"access granted successfully"});
        }
        res.status(404).json({message:"user does not exist"}); 

    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).json({ message: "Error adding project", error: error.message });     
    }
}

module.exports = {
    getUserProjects,
    createProject,
    giveProjectAccess

}