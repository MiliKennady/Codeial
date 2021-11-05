//module.exports.actionName = function(request,response){};

module.exports.home = function(request,response){
    return response.end('<h1>Express is up for Codeial</h1>');
}


module.exports.friends = function(request,response){
    return response.end('<h1>Friends page is being rendered</h1>');
}