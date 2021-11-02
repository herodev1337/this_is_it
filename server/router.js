var router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware'),
  appController = require('./controllers/app.controller'),
  quizController = require('./controllers/quiz.controller'),
  authController = require('./controllers/auth.controller')

/**
 *
 *                      Main Routes
 *
 */
router.route('/whoami').get(authMiddleware, appController.showWhoami);

router.route('/').get(appController.showHome);

/**
 *
 *                      Quiz Routes
 *
 */

router.route('/').get(quizController.showQuizView); //TODO: Overview of quizzes

/**
 *
 *                      Login Routes
 *
 */
router
  .route('/login')
  .get(authController.showLogin)
  .post(authController.loginUser);

router.route('/register').post(authController.registerUser);

module.exports = router;
