const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     min: 3,
//     max: 30,
//   },
//   password: {
//     type: String,
//     required: true,
//     max: 1024,
//     min: 10,
//   },
//   admin: {
//     type: Boolean,
//     default: false,
//     required: false,
//   },
//   room: {
//     type: String,
//     default: "",
//     required: false,
//   },
// });


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      min: 3,
      max: 30
    },
    fullname: {
      type: String,
      default: ""
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 10,
    },
    groups: {
      type: Array,
      default: []
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    likedPosts: [{
      postId: mongoose.Types.ObjectId,
      likedAt: {
        type: Date,
        default: Date.now()
      }
    }],
    savedPosts: [{
      postId: mongoose.Types.ObjectId,
      savedAt: {
        type: Date,
        default: Date.now()
      }
    }]
})

module.exports = mongoose.model("User", userSchema);
