var router = require('express').Router()
const quizController = require('../../controllers/api/quizApi.controller')
const authMiddleware = require('../../middleware/auth.middleware')


router.route('/')
    .get(quizController.getQuiz) //TODO: Overview of quizzes
    .post(authMiddleware, quizController.createQuiz) //TODO: Create a quiz

router.route('/:quizId')
    .get(quizController.showQuiz) //TODO: Show the quiz
    .put(authMiddleware, quizController.updateQuiz) //TODO: Update quiz
    .delete(authMiddleware, quizController.deleteQuiz) //TODO: Delete quiz

router.route('/:quizId/questions')
    .get(quizController.getQuestions) //TODO: Get all questions
    .post(authMiddleware, quizController.createQuestion) //TODO:  Add question

router.route('/:quizId/questions/:questionId')
    .get(quizController.getQuestion) //TODO: Get a question
    .put(authMiddleware, quizController.updateQuestion) //TODO: Update a question
    .delete(authMiddleware, quizController.deleteQuestion) //TODO: Delete a question

module.exports = router
