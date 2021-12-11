const logger = require("../utils/logger")

const Post = require("../models/Post");
const auth = require("../utils/auth")
const { sendData, sendError } = require("../utils/sendJSON");

const getPosts = (req, res, next) => {
    let searchString = {public: true};
    if(auth.verifyToken(req.cookies.auth_token)){
        searchString = {};
    }
    Post.find(searchString).then(responseData => { 
        sendData(res, responseData) 
    }).catch(err => {
        sendError(res, req, err.message)
    })
}

const getPost = (req, res, next) => {
    Post.findById(req.params.postId).then(responseData => { 
        sendData(res, responseData) 
    }).catch(err => {
        sendError(res, req, err.message)
    })
}

const createPost = async (req, res, next) => {
    const newPost = await new Post(req.body);
    try{
        newPost.save();
        sendData(res, { data: newPost});
    }catch(e){
        sendError(res, req, e.message)
    }
}

const updatePost = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.postId, {$set: req.body }, { new: true }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

const likePost = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.postId, { $push: {likes: req.body } }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

const unlikePost = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.postId, { $pull: {likes: req.body } }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

const deletePost = (req, res, next) => {
    Post.findByIdAndRemove(req.params.postId).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}


module.exports = {
    getPosts, //User
    getPost, //User
    createPost,
    updatePost,
    likePost,
    unlikePost,
    deletePost
  };