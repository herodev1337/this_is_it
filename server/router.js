var router = require('express').Router();
const authMiddleware = require('./middleware/auth.middleware'),
  // appController = require('./controllers/app.controller'),
  // quizController = require('./controllers/quiz.controller'),
  authController = require('./controllers/auth.controller')
  // postController = require('./controllers/post.controller')

//App Routes
// router.route('/whoami').get(authMiddleware, appController.showWhoami);

// router.route('/').get(appController.showHome);

//Quiz Routes

// router.route('/quiz').get(quizController.showQuizView); //TODO: Overview of quizzes

//Post Routes


//API Routes
router
  .route('/login')
  .get(authController.showLogin)
  .post(authController.loginUser);

router.route('/register').post(authController.registerUser);

// router.get('/admin', authMiddleware, postController.showAdminPanel);
router.get('/admin/create', (req, res) => { res.render('admin/editor')})
// router.put('/admin/:postId/edit', authMiddleware, postController.updatePost);
// router.delete('/admin/:postId/delete', authMiddleware, postController.showAdminPanel);
// router.post('/admin/create', authMiddleware, postController.createPost);

//Admin routes
router
  .get('/admin') //Show adminpanel

router
  .get('/admin/login') //Show Login for adminpanel

router
  .get('/admin/posts') //Show adminpanel-posts
  
module.exports = router;
