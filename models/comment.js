const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({  //defining the schema

    content: {
        type:String,
        required:true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
});

const Comment = mongoose.model('Comment',commentSchema);  //telling mongoose that this model is going to be a collection

module.exports = Comment; //making this model exportable