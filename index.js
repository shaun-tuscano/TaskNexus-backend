const express = require("express");
const userRoute = require('./routes/user.js');
const validateToken = require('./middleware/authToken.js');
const apiRoute = require('./routes/apiRoutes.js');

const app = express();

app.use(express.json());

//route for auth 

app.use('/auth',userRoute);

app.use('/api',validateToken);//token auth middleware

app.use('/api',apiRoute);



app.listen(8000,()=>{
    console.log("server started at port 8000");    
})






