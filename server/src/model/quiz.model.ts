import mongoose from 'mongoose';

export interface QuizInput {
  name: string;
  instructions: string;
  isEnabled: boolean;
  questions: [QuestionDocument];
}

export interface QuizDocument extends QuizInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface AnswerDocument extends mongoose.Document {
  answer: string;
  correct: boolean;
}

export interface QuestionDocument extends mongoose.Document {
  question: string;
  answers: [AnswerDocument];
  isEnabled: Boolean;
  explanation: string;
}

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  answers: [answerSchema],

  isEnabled: {
    type: Boolean,
    default: true,
  },

  explanation: {
    type: String,
    default: '',
  },
});

const quizSchema = new mongoose.Schema(
  {
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
      default: true,
    },

    questions: [questionSchema],
  },
  { timestamps: true }
);

const Quiz = mongoose.model<QuizDocument>('Quiz', quizSchema);

export default Quiz;
