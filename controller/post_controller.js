// module.exports.post = function(request, response){
//     return response.render('post',{
//         title:"My Posts"
//     });
// }

//importing the post model
const Post = require('../models/post');


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