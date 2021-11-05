module.exports.post = function(request, response){
    return response.render('post',{
        title:"My Posts"
    });
}