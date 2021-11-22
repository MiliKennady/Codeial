//module.exports.actionName = function(request,response){};

const Post = require('../models/post');   //requiring the Post Model
const { user } = require('./users_controller');


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

    Post.find({}).populate('user').exec(function(err,allPosts){
        if(err)
        {
            console.log("error in finding Posts",err); 
            return;
        }

        console.log(allPosts);

        return response.render('home',{
            title:"Codeial | Home",

            posts: allPosts   //passing all posts retrieved from database
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

