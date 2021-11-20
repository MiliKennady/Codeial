//this index. js is the entry point to all the routes
const express = require('express');  //fetches the existing instance which was created in the main index.js

const router = express.Router(); //calling the router

console.log('Router Loaded');

//for home page
const homeController = require('../controller/home_controller');
router.get('/',homeController.home); //for the url '/' the action to be called is the homeController.home  1)homeController-> Variable exported from the controller js file 2)home is the action

//for post page
const postController = require('../controller/post_controller');
router.get('/post',postController.post);

const usersController = require('../controller/users_controller');
router.get('/users',usersController.user);
router.use('/users',require('./users'));  //for the /profile path we use the user.js file

const friendsController = require('../controller/home_controller');
router.get('/friends',friendsController.friends);
// for any further routes, access from here
//router.user('/routerName',require('./routerfile'));

router.post('/createPost',homeController.post);



module.exports = router; //making this available to be exported