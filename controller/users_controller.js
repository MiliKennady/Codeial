module.exports.user = function(request,response){
    return response.render('user',{
        title: "Users"
    });
}

module.exports.profile = function(request, response){
    return response.render('profile',{
        title: "Profile"
    });
}

module.exports.updateProfile = function(request,response){
    return response.render('updateProfile',{
        title: "Update your Profile"
    });
}