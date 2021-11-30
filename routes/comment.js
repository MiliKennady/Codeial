const express = require('express');

const router = express.Router();

const passport = require('passport');

const CommentsController = require('../controller/comments_controller');

router.post('/create', passport.checkAuthentication, CommentsController.createComment);

router.get('/destroy/:id', passport.checkAuthentication, CommentsController.destroyComment);

module.exports = router;