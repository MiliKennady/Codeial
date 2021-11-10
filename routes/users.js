const express =  require('express');

const router = express.Router();

const usersController = require('../controller/users_controller');
router.get('/profile',usersController.profile);

const updateProfileController = require('../controller/users_controller');
router.get('/updateprofile',updateProfileController.updateProfile);

const signupController = require('../controller/users_controller');
router.get('/signup',signupController.signup);

router.post('/create',signupController.createNewUser);

router.post('/createSession', usersController.createSession);

const loginController = require('../controller/users_controller');
router.get('/login',signupController.login);

router.get('/logout',signupController.logout);
module.exports = router;