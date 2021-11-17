//module.exports.actionName = function(request,response){};

module.exports.home = function(request,response){
    //console.log(request.cookies);
    //response.cookie('userid',4990)
    
    return response.render('home',{
        title:"Home"
    });
}


module.exports.friends = function(request,response){
    return response.render('friends',{
        title: "Your Friends"
    });
}

