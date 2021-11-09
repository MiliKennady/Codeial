const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true    //to store the created and updated at time of an entry
});

const User = mongoose.model('User',userSchema);

module.exports = User;