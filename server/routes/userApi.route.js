var router = require('express').Router();
const userController = require('../controllers/userApi.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.route('/');

router.route('/:userId')
  .get(authMiddleware, userController.getUser);

router.route('/:userId/like').put(authMiddleware, userController.likePost);
router.route('/:userId/unlike').put(authMiddleware, userController.unlikePost);

router.route('/:userId/save').put(authMiddleware, userController.savePost);
router.route('/:userId/unsave').put(authMiddleware, userController.unsavePost);

module.exports = router;
