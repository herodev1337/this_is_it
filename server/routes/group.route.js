var router = require('express').Router()
const groupController = require('../controllers/group.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.route('/group/')
    .get(groupController.getGroups) //TODO: Overview of all posts
    .post(groupController.createGroup) //TODO: Create a post

router.route('/group/:groupId')
    .get(groupController.getGroup) //TODO: Show the post
    .put(authMiddleware, groupController.updateGroup) //TODO: Update post
    .delete(authMiddleware, groupController.deleteGroup) //TODO: Delete post

router.route("/test/").get(authMiddleware, groupController.getGroups)


module.exports = router