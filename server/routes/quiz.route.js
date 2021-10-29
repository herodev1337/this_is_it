var router = require('express').Router()
const quizController = require('../controllers/quiz.controller')


router.route('/')
    .get(quizController.showQuizView) //TODO: Overview of quizzes


module.exports = router
