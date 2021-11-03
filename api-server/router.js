var router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware'),
  postController = require('./controllers/postApi.controller'),
  quizController = require('./controllers/quizApi.controller')

/**
 *
 *                      Main Routes
 *
 */

module.exports = router;
