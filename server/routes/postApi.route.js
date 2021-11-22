var router = require('express').Router();
const postController = require('../controllers/postApi.controller');
const authMiddleware = require('../middleware/auth.middleware');

router
  .route('/')
  .get(postController.getPosts) //TODO: Overview of all posts
  .post(authMiddleware, postController.createPost); //TODO: Create a post

router
  .route('/:postId')
  .get(postController.getPost) //TODO: Show the post
  .put(authMiddleware, postController.updatePost) //TODO: Update post
  .delete(authMiddleware, postController.deletePost); //TODO: Delete post

router.route('/:postId/like').put(authMiddleware, postController.likePost);
router.route('/:postId/unlike').put(authMiddleware, postController.unlikePost);

module.exports = router;
