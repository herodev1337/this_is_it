const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 10,
  },
  admin: {
    type: Boolean,
    default: false,
    required: false,
  },
  room: {
    type: String,
    default: "",
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
