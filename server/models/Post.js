const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        title: {
          type: String,
          required: true
        },
        author: {
          type: String,
          default: "admin"
        },
        public: {
            type: Boolean,
            default: false
        },
        postData: {
          type: Object
        },
        createdAt: {
          type: Date,
          default: Date.now()
        }
});

module.exports = mongoose.model('Post', postSchema);