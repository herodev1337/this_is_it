const Quiz = require("../../models/Quiz");

//TODO: Cleanup/Validation
const showQuizView = async (req, res, next) => {
    Quiz.find({isEnabled: true}).then(responseData => { 
        res.render('quiz/quizOverview', {quizzes: responseData});
    }).catch(err => {
        console.log(err.message);
    });
}

// //TODO: Cleanup/Validation
const showQuiz = async (req, res, next) => {
    Quiz.findById(req.params.quizId).then(responseData => { 
        res.render('quiz/quiz', {quiz: responseData});
    }).catch(err => {
        console.log(err.message);
    })
}

const createQuiz = async (req, res, next) => {

}

const quizEditor = async (req, res, next) => {
    Quiz.find().then(responseData => { 
        res.render('quiz/quizEditor', {quizzes: responseData});
    }).catch(err => {
        console.log(err.message);
    });
}

// //TODO: Cleanup/Validation
const verifyAnswer = async (req, res, next) => {
    Quiz.findById(req.query.quizId).then(responseData =>{
        const question = responseData.questions.find(q => q._id == req.query.questionId);
        const response = (question.answers[question.answer]._id == req.query.answerId);
        res.status(200).json({ 
            error: null,
            data: response
        })
    }).catch(err => {
        console.log(err.message)
    });
}

module.exports = {
    showQuizView,
    showQuiz,
    verifyAnswer,
    quizEditor,
    createQuiz
}