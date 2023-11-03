const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema ({
    name : {type: String, required:true , unique : true},
    email : {type:String , required:true, unique:true},
    password: {type:String, required:true, unique:true},
    verified : {type: Boolean,default: false},
    verificationToken: String,
    profileImage : String,
    userDescription: {type:String , default: null},
    connections:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
        connectionRequests:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"  
            }
        ],
    
        sentconnectionRequests:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"  
            }
        ],
    
        posts:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"  
            }
        ],

        createdAt: {
            type: Date,
            default: Date.now
        }
    
    

});
module.exports = mongoose.model("User", UserSchema);