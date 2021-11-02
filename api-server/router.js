var router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware'),
  postController = require('./controllers/postApi.controller'),
  quizController = require('./controllers/quizApi.controller')

/**
 *
 *                      Main Routes
 *
 */

 router.route('/')
 .get(quizController.getQuizzes) //TODO: Overview of quizzes
 .get(quizController.getQuiz) //TODO: Overview of quizzes
 .post(authMiddleware, quizController.createQuiz) //TODO: Create a quiz

router.route('/:quizId')
//  .get(quizController.showQuiz) //TODO: Show the quiz
 .put(authMiddleware, quizController.updateQuiz) //TODO: Update quiz
 .delete(authMiddleware, quizController.deleteQuiz) //TODO: Delete quiz
router.route('/:quizId/questions')
 .get(quizController.getQuestions) //TODO: Get all questions
 .post(authMiddleware, quizController.createQuestion) //TODO:  Add question
router.route('/:quizId/questions/:questionId')
 .get(quizController.getQuestion) //TODO: Get a question
 .put(authMiddleware, quizController.updateQuestion) //TODO: Update a question
 .delete(authMiddleware, quizController.deleteQuestion) //TODO: Delete a question

module.exports = router;
