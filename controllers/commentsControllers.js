const { createComment } = require("../models/commentsModel");
const { createCommentVal } = require("../validation/commentval");


const addComments = async (req,res) => {
    try {
        const result =  await createCommentVal.validateAsync(req.body);
        const comment =  await createComment(req.user.id,result);
        if(comment){
            return  res.status(200).json({message:"commented successfully"});  
         }
 
         res.status(404).json({message:"error while commenting"});
      
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).json({ message: "error while commenting", error: error.message });    
    }
}








module.exports = {
    addComments,
}

