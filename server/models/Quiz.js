const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({ 
  answer: {    
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    default: false
  }
});

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    answers: [answerSchema],

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
    },

    isEnabled: {
        type: Boolean,
        default: true
    },

    questions: [questionSchema],

});

//TODO: DEBUG
quizSchema.query.byQuestionId = (id) => {
  return this.where({ _id: id})
}

module.exports = mongoose.model('Quiz', quizSchema);

//JSON
// {
//   "name": "",
//   "instructions": "",
//   "isEnabled": true,
//   "questions": {
//     "question" : "",
//     "answers" : {
//       "option": "",
//       "option": "",
//       "option": "",
//       "option": ""
//     },
//     "answer": 1,
//     "isEnabled": true,
//     "explanation": ""
//   }
// }