const express =  require('express');

const router = express.Router();

const passport = require('passport');

const PostController = require('../controller/post_controller');



router.post('/createPost',passport.checkAuthentication, PostController.create);    //this makes sure that the form is only submitted if the user is logged in,  even though we have made a check in the form, user can create own form and give action as this route and will be able to submit form without loggin in, so we are providing a 2 point check

module.exports = router;