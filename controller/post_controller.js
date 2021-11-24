// module.exports.post = function(request, response){
//     return response.render('post',{
//         title:"My Posts"
//     });
// }

//importing the post model
const Post = require('../models/post');
const Comment = require('../models/comment')

module.exports.create = function(request, response){
    Post.create({
        content :  request.body.content,
        user: request.user._id
    }, function(err, post){
        if(err){
            console.log('Error in creating post:', err);
        }

        return response.redirect('back');
    })
}

//deleting a post
module.exports.destroy = function (request, response){
    
    //find if the post exists in the database from the id sent through string parameters
    Post.findById(request.params.id, function(err, post){

        if(post.user == request.user.id){ //.id means converting the object id into string since both of them need to be in string format
            post.remove();

            Comment.deleteMany({post: request.params.id}, function(err){
                return response.redirect('back');
            });
        }
        else{
            return response.redirect('back');
        }
    })
}