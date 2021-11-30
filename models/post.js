const mongoose = require('mongoose'); //requiring mongoose, we'll use the same instance

const postSchema = new mongoose.Schema({

    content :{
        type:String,
        required:true
    },

    user :{
        type: mongoose.Schema.Types.ObjectId, //this is going to refer to the ObjectId of the user model
        ref: 'User'   //referes to the schema of the User model
    },
    //whenever I am loading the posts i need to see the comments made for that post, since this is a frequent action, we will include id's of all comments of this post in a array, in the post Schema itself
     comments : [               //since this is an array of comment id's, the square bracket
         {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]

},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports=Post;