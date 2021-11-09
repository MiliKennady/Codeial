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
    return response.render('profile',{
        title: "Profile"
    });
}

////rendering update profile page
module.exports.updateProfile = function(request,response){
    
    return response.render('updateProfile',{
        title: "Update your Profile"
    });

}

//rendering signup page
module.exports.signup = function(request,response){
    return response.render('signup',{
        title: "SignUp Page"
    });
}

//rendering login page
module.exports.login = function(request,response){
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
    
}