//module.exports.actionName = function(request,response){};

const Post = require('../models/post');   //requiring the Post Model
//const { user } = require('./users_controller'); //no idea what tf is this

const User = require('../models/user');

module.exports.home = function(request,response){
    
    //console.log(request.cookies);   //cookies function for reference only
    //response.cookie('userid',4990)
    // Post.find({},function(err, allPosts){   //this operation finds all posts in db and return the value
    //     if(err)
    //     {
    //        console.log("error in finding Posts",err); 
    //        return;
    //     }
    //     return response.render('home',{
    //         title:"Codeial | Home",

    //         posts: allPosts   //passing all posts retrieved from database
    //     });

    // });

    Post.find({})
    .populate('user') //prepopulating the user details of the post
    .populate({   //need to get the comments on this post and the user details who commented
        path : 'comments',
        populate:{
            path: 'user'
        }
    })  
    .exec(function(err,allPosts){ //prepopulating the user field of Post with user details
        if(err)
        {
            console.log("error in finding Posts",err); 
            return;
        }

        User.find({}, function(err, users){
            return response.render('home',{
                title:"Codeial | Home",
                posts: allPosts,   //passing all posts retrieved from database
                all_users:users
            });
        });
        
    })
} 

// module.exports.post = function (request,response) {  //this is the saving post controller created by me which also works

//     let post = new Post({content:request.body.content, user:request.user.id});
//     post.save(function (err, post) {
//         if (err) return console.error(err);
//         console.log(post.content + " saved tpost to db.");
//       });
      
//     console.log('post requets body',request);
//     return response.redirect('/users/profile');
// }


module.exports.friends = function(request,response){
    return response.render('friends',{
        title: "Your Friends"
    });
}

