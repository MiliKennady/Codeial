//importing the db model
const User = require('../models/user');  

//rendering user page
module.exports.user = function(request,response){
    return response.render('user',{
        title: "Users"
    });
}



//rendering profile page
module.exports.profile = function(request, response){
    User.findById(request.params.id, function(err, user){
        return response.render('profile',{
            title: "User Profile",
            profile_user:user
        });
    });
    
}

////rendering update profile page
module.exports.updateprofile = function(request,response){
    
    //check if update request is from the logged in user
    if(request.user.id == request.params.id){
        User.findByIdAndUpdate(request.params.id, request.body, function(err, user){
            return response.redirect('back');
        });
    }else{
        response.status(401).send('Unauthorized');
    }

}

//rendering signup page
module.exports.signup = function(request,response){
    if(request.isAuthenticated())   //this makes sure that the sign up page is only visible if the user is not signed in
    {
        return response.redirect('/users/profile');
    }
    return response.render('signup',{
        title: "SignUp Page"
    });
}

//rendering login page
module.exports.login = function(request,response){
    if(request.isAuthenticated())   //this makes sure that the login page is only visible if the user is not signed in
    {
        return response.redirect('/users/profile');
    }
    return response.render('login',{
        title: "Login Page"
    });
}

//getting the details entered in signup page 
module.exports.createNewUser = function(request, response){

    console.log(request.body);
    //checking if entered password and confirmed password is same
    if(request.body.password != request.body.confirm_password)
    {
        return response.redirect('back');
    }

    //checking if entered email id already exists or not

    User.findOne({email:request.body.email}, function(err, user){

        if(err)
        {
            console.log('Error in finding User while signing up');
            return;
        }

        if(!user)  //if user not present then create new entry
        {
            User.create(request.body, function(err, user){
                if(err)
                {
                    console.log('Error in finding User while creating new user -');
                    return;
                }
                
                return response.redirect('/users/login');
            })
        }else{   //if user already exist send the user back to login page

            return response.redirect('back');
        }
    })

}

//getting the details entered in login page or when a user signs in successfully
module.exports.createSession = function(request, response){
    return response.redirect('/');
}

module.exports.destroySession = function(request,response){
    //console.log('Am I here?')
    request.logOut();
    request.session.destroy();
    return response.render('signout',{
        title: "Signed Out"
    });
}