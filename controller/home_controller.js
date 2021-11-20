//module.exports.actionName = function(request,response){};

const Post = require('../models/post');   //requiring the Post Model


module.exports.home = function(request,response){
    //console.log(request.cookies);
    //response.cookie('userid',4990)
    
    return response.render('home',{
        title:"Home"
    });
}

module.exports.post = function (request,response) {

    let post = new Post({content:request.body.content, user:request.user.id});
    post.save(function (err, post) {
        if (err) return console.error(err);
        console.log(post.content + " saved tpost to db.");
      });
      
    console.log('post requets body',request);
    return response.redirect('/users/profile');
}

module.exports.friends = function(request,response){
    return response.render('friends',{
        title: "Your Friends"
    });
}

