var router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware'),
  appController = require('./controllers/app.controller'),
  quizController = require('./controllers/quiz.controller'),
  authController = require('./controllers/auth.controller'),
  postController = require('./controllers/post.controller')

/**
 *
 *                      Main Routes
 *
 */
router.route('/whoami').get(authMiddleware, appController.showWhoami); //DEBUG

router.route('/').get(appController.showHome);

/**
 *
 *                      Quiz Routes
 *
 */

router.route('/').get(quizController.showQuizView); //TODO: Overview of quizzes

/**
 *
 *                      Admin Routes
 *
 */

//Login Site -> Render admin/login | AuthController
router
  .route('/admin/login')
  .get((req, res) => { res.render('admin/login') })
  .post(authController.loginUser);

//Admin Dashboard -> Render admin/adminPanel
router
  .route('/admin/')
  .get(authMiddleware, (req, res) => { res.render('admin/adminPanel') })

//Register Site -> AuthController
router
  .post('/admin/register', authController.registerUser); //user management?

//Overview of all Posts -> Render admin/posts/postOverview
router
  .get('/admin/posts', postController.getPosts); 

//Create a post -> Render admin/posts/postEditor | PostController
router
  .route('/admin/posts/create')
  .get(postController.getPosts)
  .post(postController.createPost);

//Edit a post -> Render admin/posts/postEditor | PostController
router
  .route('/admin/posts/:postId/edit')
  .get(postController.showEditor)
  .put(postController.updatePost);

//Delete a post -> Render admin/posts/postOverview + alertbox-message | PostController
router
  .delete('/admin/posts/:postId/delete', (req,res) => { res.render('admin/posts/postOverview') })


module.exports = router;
