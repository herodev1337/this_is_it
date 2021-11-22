const logger = require("../utils/logger")

const User = require("../models/User");
const auth = require("../utils/auth")
const { sendData, sendError } = require("../utils/sendJSON");

//* GET - /api/users/:userId
const getUser = (req, res, next) => {
    if(!req.params.userId) return sendError(req, res, "userId not provided!")
    User.findById(req.params.userId).then(responseData => { 
        return sendData(res, responseData) 
    }).catch(err => {
        return sendError(res, req, err.message)
    })
}

//* PUT - /api/users/:userId/like
const likePost = (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, { $push: {likedPosts: req.body } }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

//* PUT - /api/users/:userId/unlike
const unlikePost = (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, { $pull: {likedPosts: req.body } }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

//* PUT - /api/users/:userId/save
const savePost = (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, { $push: {savedPosts: req.body } }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

//* PUT - /api/users/:userId/unsave
const unsavePost = (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, { $pull: {savedPosts: req.body } }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

module.exports = {
    getUser,
    likePost,
    unlikePost,
    savePost,
    unsavePost
  };