const express = require('express');

const router = express.Router();

const passport = require('passport');

const CommentsController = require('../controller/comments_controller');

router.post('/create', passport.checkAuthentication, CommentsController.createComment);

module.exports = router;