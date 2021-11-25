const logger = require("../../utils/logger")

const Post = require("../../models/Post");
const auth = require("../../utils/auth")
const { sendData, sendError } = require("../../utils/sendJSON");

const getPosts = (req, res, next) => {
    let searchString = {public: true};
    if(auth(req.cookies.auth_token)){
        searchString = {};
    }
    Post.find(searchString).then(responseData => { 
        res.render('admin/posts/postOverview', { posts: responseData })
    }).catch(err => {
        return err.message
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

const deletePost = (req, res, next) => {
    Post.findByIdAndRemove(req.params.postId).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

const showEditor = (req, res, next) => {
    Post.findById(req.params.postId).then(responseData => { 
        res.render('admin/posts/postEditor', { post: responseData })
    }).catch(err => {
        sendError(res, req, err.message)
    })
}

module.exports = {
    getPosts, //User
    getPost, //User
    createPost,
    updatePost,
    deletePost,
    showEditor
  };