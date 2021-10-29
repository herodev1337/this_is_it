//TODO: Cleanup/Validation
const showQuizView = async (req, res, next) => {
    res.render('quiz/quizOverview');
}

// //TODO: Cleanup/Validation
// const showQuiz = async (req, res, next) => {
//     res.render('quiz/quizOverview');
// }

module.exports = {
    showQuizView
}