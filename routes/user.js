const express = require("express");
const router = express.Router();
const {registerUser,verifyUser} = require('../controllers/usercontroller.js')



//sign up 
router.post('/signup',registerUser);

//login
router.post('/login',verifyUser);




module.exports = router;