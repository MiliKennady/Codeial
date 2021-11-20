const mongoose = require('mongoose'); //requiring mongoose, we'll use the same instance

const postSchema = new mongoose.Schema({

    content :{
        type:String,
        required:true
    },

    user :{
        type: mongoose.Schema.Types.ObjectId, //this is going to refer to the ObjectId of the user model
        ref: 'User'   //referes to the schema of the User model
    }
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports=Post;