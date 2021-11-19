const logger = require("../utils/logger")

const User = require("../models/User");
const auth = require("../utils/auth")
const { sendData, sendError } = require("../utils/sendJSON");

const likePost = (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, { $push: {likedPosts: req.body } }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

module.exports = {
    likePost
  };