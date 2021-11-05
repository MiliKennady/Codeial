const express =  require('express');

const router = express.Router();

const usersController = require('../controller/users_controller');
router.get('/profile',usersController.profile);

const updateProfileController = require('../controller/users_controller');
router.get('/updateprofile',updateProfileController.updateProfile);


module.exports = router;