let router = require('express').Router();
const quizController = require('../../controllers/api/quizApi.controller');
const authMiddleware = require('../../middleware/auth.middleware');

 
router
  .route('/quizzes/')
  .get(quizController.getQuizzes) //? Overview of quizzes
  .post(authMiddleware, quizController.createQuiz) //? [AUTH] Create a quiz
  .put(quizController.unsupportedOperation) //* Not Supported
  .delete(quizController.unsupportedOperation) //* Not Supported

router
  .route('/quizzes/:quizId')
  .get(quizController.getQuiz) //? Show the quiz
  .post(quizController.unsupportedOperation) //* Not Supported
  .put(authMiddleware, quizController.updateQuiz) //? [AUTH] Update quiz
  .delete(authMiddleware, quizController.deleteQuiz); //? [AUTH] Delete the quiz

router
  .route('/quizzes/:quizId/questions')
  .get(quizController.getQuestions) //? Get all questions
  .post(authMiddleware, quizController.createQuestion) //? [AUTH] Create a question
  .put(quizController.unsupportedOperation) //* Not Supported
  .delete(quizController.unsupportedOperation) //* Not Supported

router
  .route('/quizzes/:quizId/questions/:questionId')
  .get(quizController.getQuestion) //? Get a question
  .post(quizController.unsupportedOperation) //* Not Supported
  .put(authMiddleware, quizController.updateQuestion) //? [AUTH] Update a question
  .delete(authMiddleware, quizController.deleteQuestion) //? [AUTH] Delete a question

module.exports = router;
