var router = require("express").Router();
const quizController = require("../controllers/api/quizApi.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/quiz", quizController.getQuizzes);

router.get("/quiz/:id", quizController.getQuiz);

//? Ajax POST
//router.get("/quiz/:quizId/question/:questionId", quizController.showQuestion)

//Admin
router.post("/quiz/create", /*authController,*/ quizController.createQuiz)

// router.put("/quiz/:id/edit", /*authController,*/ quizController.editQuiz)

router.delete("/quiz/:id/delete", /*authController,*/ quizController.deleteQuiz)

module.exports = router;
