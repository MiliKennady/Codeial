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

//controller to delete a comment under a post
module.exports.destroyComment = function(request, response){

    //find the comment in the db
    Comment.findById( request.params.id, function(err, comment){
        if(err){ return console.log('Error over here',err);}
        let postId = comment.post;
        if(comment.user == request.user.id ){ //checking if the person trying to delete is the one who is logged in

            //first fetching post id of this comment, so that we can delete the comment from the post models comment array
            

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments : request.params.id}}, function(err, post){
                return response.redirect('back');
            }); //find the post by 'postId', pull of the comment from the array
        }
        else{    //if the post owner wants to remove an inappropriate comment on their post made by another user
            Post.findById(postId, function(err, post){
                var postUser = post.user;

                if(postUser == request.user.id){

                    comment.remove();
                    Post.findByIdAndUpdate(postId, { $pull: {comments : request.params.id}}, function(err, post){
                    return response.redirect('back');
                    }); 

                }
                else{
                    return response.redirect('back');
                }
            });
            //console.log('Am i here??? dylan');
            
        }

    });

}