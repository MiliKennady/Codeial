module.exports.user = function(request,response){
    return response.end('<h1>Rendering the user page</h1>')
}

module.exports.profile = function(request, response){
    return response.end('<h1>User Profile</h1>');
}

module.exports.updateProfile = function(request,response){
    return response.end('<h1>Rendering the update Profile controller</h1>')
}