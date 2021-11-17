const express =  require('express');

const router = express.Router();

const passport = require('passport');


const usersController = require('../controller/users_controller');
router.get('/profile',passport.checkAuthentication,usersController.profile);  //making the profile page only when the user is logged in

const updateProfileController = require('../controller/users_controller');
router.get('/updateprofile',updateProfileController.updateProfile);

const signupController = require('../controller/users_controller');
router.get('/signup',signupController.signup);

//router.post('/create',signupController.createNewUser);

const loginController = require('../controller/users_controller');
router.get('/login',signupController.login);


//use passport as a middlewear to authenticate
// router.post('/createSession',passport.authenticate(  //the middlewear passport first authenticates this
//     'local',  //stratergy used is local
//     {failureRedirect:'/users/login'}         //if session fails, redirect back to login page
// ),usersController.createSession);               //if session is 'done' then this controller function is called

router.post('/create',usersController.createNewUser);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/login'},
),usersController.createSession);

router.get('/signout',usersController.destroySession);

module.exports = router;