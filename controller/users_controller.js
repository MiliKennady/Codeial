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
    //check if cookie exists, if cookie exists it means that the user is logged in and we can start the session and show the profile page with user related details
    //console.log(request.cookies);
    if(request.cookies.user_id){
        console.log('entered here');
        User.findById(request.cookies.user_id, function(err,user){
            if(err)
            {
                console.log('Error in fetching the user entry');
                return response.redirect('back');
            }
            //console.log(user);
            if(user){
                return response.render('profile',{
                    title:"Your Profile",
                    user:user
                });
            }
            
        })
    }
    else
        return response.redirect('back');
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
   
    //find the user in the database
    // console.log(request.body);

    User.findOne({email:request.body.email}, function(err, user){
        //if error
        if(err)
        {
            console.log('Error in finding User');return;
        }
      
        if(user){     //if the user found
            
           //if password does not matches
            if(user.password != request.body.password){
                console.log('Incorrect Password');
                return response.redirect('back');
            }
            else{
                //handle session creation
                response.cookie('user_id',user.id);
                return response.redirect('/users/profile');
            }
            
        }
        else{   //if user not found
            console.log('User not found');
            return response.redirect('back');
        }

        
    });  
}

module.exports.logout = function(request,response)
{
    response.clearCookie('user_id');   
    return response.redirect('/users/logout')
}