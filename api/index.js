const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

const authRoute = require("./routes/userAuth");
dotenv.config();
app.use((req, res,next)=> {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(cors({}));
app.get("/register", (req,res)=>{
    const {email}= req.body;
    console.log(email)
    res.send("hello world");
})

mongoose.connect(process.env.MONGO_URL
    ).then(()=>console.log("DBconnection Successful")).catch((err)=> console.log(err));
    app.use(express.json());
    app.use("/api/userAuth", authRoute);
    app.listen(process.env.PORT || 5000, ()=>{ 
        console.log("Backend Server is working"); 
    });
    