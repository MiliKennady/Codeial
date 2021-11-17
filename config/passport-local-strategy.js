//setting up passport.js
//passport.js uses session cookies hence the id in the cookie will be encrypted

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;  //passport locals strategy property imported

const User = require('../models/user');  //importing the user model


//authentication using passport
passport.use(new LocalStrategy({   //telling passport to use the local strategy
    
    usernameField:'email'    //here email is the email specified in the schema which is unique

    },
    function(email, password, done) {    //a callback function inside strategy, takes email, pws and another callback function done, it is an inbuilt function i.e automatically called
        //find a user and establish the identity
        //console.log('Am I here?');
        User.findOne({email:email}, function(err,user){
            if(err)
            {
                console.log('Error in finding the user ---> passport');
                return done(err); //done reports the error to the passport.js
            }
            //if user is not found or incorrect password

            if(!user || user.password != password){
                console.log('Incorrect username or password');
                return done(null,false); //null since no error and false as in authentication was not done
            }

            //if user found
           
                console.log('User from the db in passport',user)
                return done(null,user); //user is the user we have found from db
            
        });
    }

));

//serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);  //stores users id in encrypted format in the cookie
});


//deserialize the user from the key in the cookie 
passport.deserializeUser(function(id, done){
    //find if user exists in the db
    User.findById(id, function(err,user){
        if(err)
        {
            console.log('Error in finding user');
            return;
        }

        return done(null, user);
    })
});

//sending data of the signed in user to the views

//check if the user is authenticated
passport.checkAuthentication = function(request, response, next){  //this function will be used as a middlewear
    //method request.authenticated will let you know if user is authenticated or not
    if(request.isAuthenticated()){
        return next();  //this will go the controller action
    }

    return response.redirect('/users/login');
}

//setting the user for the views
passport.setAuthenticatedUser =  function(request,response,next){
    if(request.isAuthenticated()){
        //console.log('in middlewear',request.user);
        //request.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        response.locals.user = request.user;  //whenever a user is signed in, that users information is available in request.user, we are now setting it to the response.local
    }
    next();
}

module.exports = passport; //making this module exportable


//passport uses local strategy to find the user that has signed in and serializeUser sets that users id into the cookie