const Quiz = require("../../models/Quiz");
const { sendData, sendError } = require("../../utils/sendJSON");


//* GET - /api/quizzes/
const getQuizzes = (req, res, next) => {
    Quiz.find({isEnabled: true}).then(responseData => { 
        return sendData(res, responseData) 
    }).catch(err => {
        return sendError(res, req, err.message)
    })
}

//* GET - /api/quizzes/:quizId
const getQuiz = (req, res, next) => {
    if(!req.params.quizId) return sendError(req, res, "quizId not provided!")
    Quiz.findById(req.params.quizId).then(responseData => { 
        return sendData(res, responseData) 
    }).catch(err => {
        return sendError(res, req, err.message)
    })
}

//* GET - /api/quizzes/:quizId/questions
const getQuestions = (req, res, next) => {
    if(!req.params.quizId) return sendError(req, res, "quizId not provided!")
    Quiz.findById(req.params.quizId).then(responseData => { 
        return sendData(res, responseData.questions) 
    }).catch(err => {
        return sendError(res, req, err.message)
    })
}

//* GET - /api/quizzes/:quizId/questions/:questionId
const getQuestion = async (req, res, next) => {
    if(!req.params.quizId && !req.params.questionId) return sendError(req, res, "quizId or questionId not provided!")
    Quiz.findById(req.params.quizId).select({ questions: {$elemMatch: { id: req.body.questionId}}}).then(quizRes => {
        return sendData(res, quizRes.questions[0])
    }).catch(err => {
        return sendError(res, req, err.message)
    })
}

//TODO: Cleanup
const createQuestion = (req, res, next) => {
    Quiz.findById(req.params.quizId).then(quizRes => {
        if(!quizRes) return sendError(res, req, 'Quiz not found');
        console.log(req.body)
        console.log(quizRes.questions)
        quizRes.questions.push(req.body);
        quizRes.save().then(responseData => {
            return sendData(res, responseData)
        }).catch(err => {
            return sendError(res, req, err.message);
        })
    }).catch(err => {
        return sendError(res, req, err.message);
    })
}

//TODO: Validation? Cleanup! 
//! FIX NOT WORKING
//Wär gut wenn man nur das Question Object reinpassen muss anstatt des ganzen Quizzes. Sprich:
// {
//     "question": "xxxx",
//     "answers": [
//         {
//             "answer": "xxx",
//             "correct": false
//         }...
//     ],
//     "isEnabled": true,
//     "explanation": "xxx"
// }

const updateQuestion = (req, res, next) => {
    console.log("Params -> ", req.params)
    console.log("Body -> ", req.body)
    Quiz.findByIdAndUpdate(req.params.questionId, {$set: req.body }, { new: true }).then(responseData => {
        console.log(responseData)
        return sendData(res, responseData)
    }).catch(err => {
        return sendError(res, req, err.message);
    })
    // Quiz.findById(req.params.quizId).then(responseData => {
    //         responseData.questions.id(req.params.questionId) = req.body;    
    //         responseData.questions.id(req.params.questionId).question = req.body.question;
    //         responseData.questions.id(req.params.questionId).answers = req.body.answers;
    //         responseData.questions.id(req.params.questionId).answer = req.body.answer;
    //         responseData.questions.id(req.params.questionId).isEnabled = req.body.isEnabled;
            
    //         responseData.save().then(responseData => {
    //             Quiz.findById(responseData._id).then(responseData => {
    //                 return sendData(res, responseData.questions.id(req.params.questionId))
    //             })
    //         }).catch(err => {
    //             return sendError(res, req, err.message);
    //         })
    // }).catch(err => {
    //     return sendError(res, req, err.message);
    // })
}

const deleteQuestion = (req, res, next) => {
    Quiz.findById(req.params.quizId).then(quizRes => {
        if(!quizRes) sendError(res, req, 'Quiz not found');
        if(!quizRes.questions.id(req.params.questionId)) sendError(res, req, 'Question not found');
        quizRes.questions.id(req.params.questionId).remove();
        quizRes.save().then(responseData => {
            Quiz.findById(responseData._id).then(responseData => {
                return sendData(res, responseData)
            })
        }).catch(err => {
            return sendError(res, req, err.message);
        })
    }).catch(err => {
        return sendError(res, req, err.message);
    })
}

/** 
 * 
 *                Quiz
 * 
 **/

const createQuiz = async (req, res, next) => {
    //TODO: Validator
    //const {error} = quizValidator(req.body);
    // if(error) {
    //     sendError(res, req, error)
    // }
    const newQuiz = await new Quiz(req.body);
    try{
        newQuiz.save();
        return sendData(res, newQuiz);
    }catch(e){
        return sendError(res, req, e.message)
    }
}

const deleteQuiz = (req, res, next) => {
    Quiz.findByIdAndRemove(req.params.quizId).then(responseData => {
        return sendData(res, responseData)
    }).catch(err => {
        return sendError(res, req, err.message);
    })
}

const updateQuiz = (req, res, next) => {
    Quiz.findByIdAndUpdate(req.params.quizId, {$set: req.body }, { new: true }).then(responseData => {
        return sendData(res, responseData)
    }).catch(err => {
        return sendError(res, req, err.message);
    })
}

const unsupportedOperation = (req, res, next) => {
    return res.status(405).json({ error: "Unsupported HTTP method!" })
}

module.exports = {
    createQuiz,
    deleteQuiz,
    updateQuiz,
    getQuestions,
    createQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    getQuizzes,
    getQuiz,
    unsupportedOperation
  };