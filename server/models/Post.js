const mongoose = require('mongoose');

const editSchema = new mongoose.Schema({
  prevState: {
    type: String
  },
  editedAt: {
    type: Date,
    default: Date.now()
  }
})

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  likedAt: {
    type: Date,
    default: Date.now()
  }
})

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'admin',
  },
  description: {
    type: String,
    default: 'Description for the article',
  },
  public: {
    type: Boolean,
    default: false,
  },
  postData: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [likeSchema],
  edits: [editSchema]
});

module.exports = mongoose.model('Post', postSchema);
