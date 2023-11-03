const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.post("/register", async (req,res)=> {
try{
    const{name, email, password, profileImage}= req.body
    console.log(req.body.email)
    const existingUser = await User.findOne({email});
    if (existingUser){
        console.log("Email already registered")
        return res.status(400).json({message:"Email already exists"})
    }
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        profileImage: req.body.profileImage,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    newUser.verificationToken =  crypto.randomBytes(20).toString("hex");
     await newUser.save();
    sendVerificationEmail(newUser.email, newUser.verificationToken)
    res.status(202).json({message:"Registration successful: Kindly check your email for verification"});

    const sendVerificationEmail= async (email, verifcationToken) =>{
        const transporter =  nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: "investorsclub98@gmail.com",
                pass:"fcbc ymmz tbdg quzm"
            }
        })
        
        const mailOptions = {
            from : "investorsclub@gmail.com",
            to: email,
            subject: "Email Verification",
            text: `please click the following link to verify your email: http://localhost:5000/verify/${verifcationToken}`,
        }
        try{
    await transporter.sendMail(mailOptions);
    console.log("verification sent successfully");
        }catch(error){
            console.log("Error sending the verification email");
    
        }
        };

} catch (err){
    res.status(500).json({message: "Registration Failed"});
}


});


router.get("/verify/:token", async (req,res)=> {
try{
const token = req.params.token;
const user= await User.findOne({verificationToken: token});
if(!user){
    return res.status(404).json({message: "invalid verification token"})
}

user.verified = true;
user.verificationToken = undefined;
 await user.save();

res.status(500).json({message:"Email Verification Successful"})
}catch(error){
res.status(500).json({message: "Email verification failed"});
}

});

module.exports = router;
