const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");

router.get("/profile/:userId", async (req, res) => {
    try{
const userId = req.params.userId;
const user = await User.findById (userId);
if(!user){
    return res.status(404).json({message:"user not found"})
}
    }catch(error){
        res.status(500).json().json({message:"Error retrieving user profile"})
    }

})
//get all connected users
router.get("/users/:userId", async (req, res) => {
try{
const loggedInUserId = req.params.userId;
const loggedInUser = await User.findById(loggedInUserId).populate("connections", "_id");
if (!loggedInUser){
    return res.status(400).json({message:"user not found"})
}


const connectedUserIds = loggedInUser.connections.map((connection => connection._id));
//not connected to the logged in users
const users =await User.find({_id:{$ne: loggedInUserId, $nin:connectedUserIds}});
res.status(200).json(users)

}catch(error){
    console.log("error retrieving users", error)
    res.status(500).json({message:"Error retrieving users"})
}
})
//send connection request
router.post("/connection-request", async (req, res) => {
try{
const {currentUserId, selectedUserId}= req.body;
await User.findByIdAndUpdate(selectedUserId, {$push:{connectionRequests:currentUserId}})
await User.findByIdAndUpdate(currentUserId,{$push:{sentconnectionRequests:selectedUserId}})
res.sendStatus(200).json({messaage:"request successfully sent"});

}catch(error){
    res.status.apply(500).json({message:"error connecting user"})
}
})
//show all connection requests
router.get("/connection-request/:userId", async (req, res) => {
try{
    const {userId}=req.params.userId;
    const user = User.findById(userId).populate("connectionRequests","name email profileImage").lean();
    const connectionRequests = user.connectionRequests;
res.json(connectionRequests)
}catch(error){
    console.log(error)
    res.status.apply(500).json({message:"error fetching connection request user"})
}
})


router.post("/connection-request/accept", async (req, res) => {
try{
const {senderId, recepientId}= req.body;
const recepient = await User.findById(recepientId);
const sender= await User.findById(senderId);

sender.connections.push(recepientId)
recepient.connections.push(senderId);

recepient.connectionRequests.filter((request)=> request.toString()!== senderId.toString())
sender.connectionRequests.filter((request)=> request.toString()!== recepientId.toString())
await sender.save();
await recepient.save();

res.status(200).json({messaage: " Your request has been accepeted"})
}catch(error){
    console.log(error)
    res.status.apply(500).json({message:"error accepting request"});
}
})



//user connections
router.get("/connections/:userId", async (req, res) => {
    try{

const  userId = req.params.userId;
const user = await User.findById(userId).populate("connections", "name profileImage createdAt").exec();
if(!user){
    return res.status(404).json({message:"User is not Found"})
}
res.status(200).json({connections: user.connections})
    }catch(error){
res.status(500).json({message:"error fetching connections"})
    }
})


//endPoint to create a post
router.post("/create", async (req, res) => {
    try{
const{description , imageUrl, userId}= req.body;
const newPost = new Post({
    description: description,
    imageUrl: imageUrl,
    user: userId
})
await newPost.save();
res.status(201).json({messaage:"newPost created successfully", post: newPost});
    }catch(error){
        res.status(500).json({message:"error creating post"})  
    }
})
//endPoint to fetch all the posts
router.get("/all", async (req, res) => {
    try{
const posts = await Post.find().populate("user", "name profileImage")
res.status(200).json({posts});
    }catch(error){
        res.status(500).json({message:"error fetching posts"})  
    }
})
router.get("/like/:postId/:userId", async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.params.userId;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(400).json({ message: "Post not found" });
      }
  
      //check if the user has already liked the post
      const existingLike = post?.likes.find(
        (like) => like.user.toString() === userId
      );
  
      if (existingLike) {
        post.likes = post.likes.filter((like) => like.user.toString() !== userId);
      } else {
        post.likes.push({ user: userId });
      }
  
      await post.save();
  
      res.status(200).json({ message: "Post like/unlike successfull", post });
    } catch (error) {
      console.log("error likeing a post", error);
      res.status(500).json({ message: "Error liking the post" });
    }
});

router.put("/profile/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const { userDescription } = req.body;
  
      await User.findByIdAndUpdate(userId, { userDescription });
  
      res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
      console.log("Error updating user Profile", error);
      res.status(500).json({ message: "Error updating user profile" });
    }
  });

    module.exports = router;
