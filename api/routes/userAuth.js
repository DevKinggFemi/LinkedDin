const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.post("/register", async (req,res)=> {
try{
  const sender =req.ip.replace('::ffff:', '');
    const{name, email, password, profileImage}= req.body;
    console.log(req.body.email)
    const existingUser = await User.findOne({email});
console.log(sender)
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

     console.log(newUser)
    sendVerificationEmail(newUser.email, newUser.verificationToken, sender)
    res.status(202).json({message:"Registration successful, Kindly check your email for verification"});

  

}catch(error){
  console.log("Error sending the verification email");

}
});

const sendVerificationEmail= async (email, verifcationToken, sender) =>{

  const transporter =  nodemailer.createTransport({
      service:'gmail',
      auth:{
          user: "mayowa.odunsi02@gmail.com",
          pass:"eaopkfebfpvvpovz"
      }
  })
  
  const mailOptions = {
      from : "roninbsc@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `please click the following link to verify your email: http://${sender}:5000/api/userAuth/verify/${verifcationToken}`,
  }
  try{
    console.log(mailOptions)
await transporter.sendMail(mailOptions);
console.log("verification sent successfully");
  }
  catch (err){
res.status(500).json({message: "Registration Failed"});
};
}


router.get("/verify/:token", async (req,res)=> {
try{
   
const token = req.params.token;
console.log(token)
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

router.post("/login", async (req, res) => {
    
    try {
       
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        console.log("User not found");
        return res.status(401).json("Wrong credentials");
      }
  
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
     
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== req.body.password) {
        return res.status(401).json("Wrong credentials");
      }
      const accessToken = jwt.sign(
        {
          userId: user._id,
          verified: user.verified,
        },
        process.env.JWT_SEC, 
        { expiresIn: "1d" }
      );
  
      const { password, ...others } = user._doc;
      
  
      res.status(200).json({  others ,accessToken });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json(err);
    }
  });
  

module.exports = router;
