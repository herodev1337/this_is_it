var router = require('express').Router()
const userController = require('../controllers/userApi.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.route('/')

router.route('/:userId/like')

router.route('/:userId/like')
    .put(authMiddleware, userController.likePost)

module.exports = router