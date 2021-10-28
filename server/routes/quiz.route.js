var router = require("express").Router();
const quizController = require("../controllers/quiz.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/quiz", quizController.showQuizOverview);

router.get("/quiz/:id", quizController.showQuiz);

//? Ajax POST
//router.get("/quiz/:quizId/question/:questionId", quizController.showQuestion)

//Admin
router.get("/quiz/create", authController, quizController.createQuiz)

router.get("/quiz/:id/edit", authController, quizController.editQuiz)

router.post("/quiz/:id/delete", authController, quizController.deleteQuiz)

module.exports = router;
