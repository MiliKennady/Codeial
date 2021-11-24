const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function(request, response){
    //creating a comment over a post
    //console.log('Am I here inside the comments COntroller');
    //first check if the post id exists, here request.body.post contains the post id sent from the form
    Post.findById(request.body.post, function(err, post){
        
        if(post){  //if post id exists
            Comment.create({     //add comment to comment db along with post id and user id
                content:request.body.content,
                post:request.body.post,
                user:request.user._id //obtained since user is logged in
            
            },function(err,comment){
                
                if(err)
                {
                    console.log('Error in creating comment',err);
                    return;
                }
                //add the comment id to post db's comment array
                
                post.comments.push(comment); //this comment is pushed, it will automatically fetch the id and push   //here we are not creating a new entry in post rather we are adding comments to the existing post, so this is an updte function
                post.save(); //after any updation we need to apply save

                response.redirect('/');
            });
        }
    });
}