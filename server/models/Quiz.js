const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true
  }
});

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: [optionSchema],

    answer: {
      type: Number,
      required: true
    },

    isEnabled: {
        type: Boolean,
        default: true
    },

    explanation:{
      type: String,
      default: ""
    }

});

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    instructions: {
        type: String,
        required: true
    },

    isEnabled: {
        type: Boolean,
        default: true
    },

    questions: [questionSchema],

});

module.exports = mongoose.model('Quiz', quizSchema);