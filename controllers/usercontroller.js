const pool = require('../database/config.js');
const {signValidation,loginValidation} = require('../validation/userValidation.js');
const {findUserByEmail,createUser,findUserByUserName,getAllUsers}= require('../models/usermodel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {

        const value = await signValidation.validateAsync(req.body);

        const existingUser = await findUserByEmail(value.gmail);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        //hash given password
        const hashedPassword = await bcrypt.hash(value.password, 10);
        value.password = hashedPassword;
        const newUser = await createUser(value);
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

const verifyUser = async(req,res) =>{
    try {
    const value = await loginValidation.validateAsync(req.body);
    const { username, password } = req.body;
    //check if user exist
    const userExist = await findUserByUserName(username);
        if (!userExist) {
            return res.status(404).json({ message: "Invalid email or password." });
        } 
        
        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (!passwordMatch) {
            return res.status(404).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { id: userExist.user_id, gmail: userExist.username }, 
            process.env.JWT_SECRET,             
            { expiresIn: '1h' }                  
        );

        res.status(200).json({
            message: "Login successful!",
            token,
        });


    } catch (error) {
        if(error.isJoi){
            return res.status(400).json({ message: error.details[0].message }); 
        }
        res.status(500).json({ message: "Error login user", error: error.message });
 
    }

}


const getUsers = async (req,res) =>{
    try {
        const result = await getAllUsers();
        if(result){
            return res.status(200).json({message:"List of all users",user_data:result});
        }
    } catch (error) {
        res.status(500).json({ message: "Error while fetching users", error: error.message }); 
    }
}


module.exports = { registerUser ,verifyUser , getUsers};