//this index. js is the entry point to all the routes
const express = require('express');  //fetches the existing instance which was created in the main index.js

const router = express.Router(); //calling the router

console.log('Router Loaded');

//for home page
const homeController = require('../controller/home_controller');
router.get('/',homeController.home); //for the url '/' the action to be called is the homeController.home  1)homeController-> Variable exported from the controller js file 2)home is the action

//for user page
const userController = require('../controller/user_controller');
router.get('/user',userController.user);


module.exports = router; //making this available to be exported