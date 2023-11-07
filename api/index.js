const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

const authRoute = require("./routes/userAuth");
const userRoute = require("./routes/user");
dotenv.config();
app.use((req, res,next)=> {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(cors({}));


mongoose.connect(process.env.MONGO_URL
    ).then(()=>console.log("DBconnection Successful")).catch((err)=> console.log(err));
    app.use(express.json());
    app.use("/api/userAuth", authRoute);
    app.use("/api/user", userRoute);
    app.listen(process.env.PORT || 5000, ()=>{ 
        console.log("Backend Server is working"); 
    });
    