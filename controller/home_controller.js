//module.exports.actionName = function(request,response){};

module.exports.home = function(request,response){
    return response.end('<h1>Express is up for Codeial</h1>');
}