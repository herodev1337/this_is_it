const Quiz = require("../../models/Quiz");
const { quizValidator } = require("../../utils/validator");
const logger = require("../../utils/logger")
const chalk = require('chalk')

//????????????????????????????????????????
//                TODO
//*              Cleanup
//????????????????????????????????????????


/** 
 * 
 *                Questions
 * 
 **/

//TODO: Cleanup/Validation

const getQuestions = (req, res, next) => {
    Quiz.findById(req.params.quizId).then(responseData => { 
        sendData(res, responseData.questions) 
    }).catch(err => {
        sendError(res, req, err.message)
    })
}

const getQuestion = async (req, res, next) => {
    Quiz.findById(req.params.quizId).select({ questions: {$elemMatch: { id: req.body.questionId}}}).then(quizRes => {
        sendData(res, quizRes.questions[0])
    }).catch(err => {
        sendError(res, req, err.message)
    })
}

const createQuestion = (req, res, next) => {
    Quiz.findById(req.params.quizId).then(quizRes => {
        if(!quizRes) sendError(res, req, 'Quiz not found');
        quizRes.questions.push(req.body);
        quizRes.save().then(responseData => {
            sendData(res, responseData)
        }).catch(err => {
            sendError(res, req, err.message);
        })
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

//TODO: Validation? Cleanup!
const updateQuestion = (req, res, next) => {
    Quizes.findById(req.params.quizId).then(responseData => {
        if (responseData != null && responseData.questions.id(req.params.questionId) != null) {
            if (req.body.question) {
                responseData.questions.id(req.params.questionId).question = req.body.question;
            }
            if (req.body.answers) {
                responseData.questions.id(req.params.questionId).answers = req.body.answers;
            }
            if (req.body.answer) {
                responseData.questions.id(req.params.questionId).answer = req.body.answer;
            }
            if (req.body.isEnabled != null) {
                responseData.questions.id(req.params.questionId).isEnabled = req.body.isEnabled;
            }
            responseData.save().then(responseData => {
                Quiz.findById(responseData._id).then(responseData => {
                    sendData(res, responseData.questions.id(req.params.questionId))
                })
            }).catch(err => {
                sendError(res, req, err.message);
            })
        }
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

const deleteQuestion = (req, res, next) => {
    Quiz.findById(req.params.quizId).then(quizRes => {
        if(!quizRes) sendError(res, req, 'Quiz not found');
        if(!quizRes.questions.id(req.params.questionId)) sendError(res, req, 'Question not found');
        quizRes.questions.id(req.params.questionId).remove();
        quizRes.save().then(responseData => {
            Quiz.findById(responseData._id).then(responseData => {
                sendData(res, responseData)
            })
        }).catch(err => {
            sendError(res, req, err.message);
        })
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

/** 
 * 
 *                Quiz
 * 
 **/

const getQuiz = async(req, res, next) => {
    Quiz.findById(req.params.quizId).then(responseData => { 
        sendData(res, responseData) 
    }).catch(err => {
        sendError(res, req, err.message)
    })
}

const createQuiz = async (req, res, next) => {
    //const {error} = quizValidator(req.body);
    // if(error) {
    //     sendError(res, req, error)
    // }
    const newQuiz = await new Quiz(req.body);
    try{
        newQuiz.save();
        sendData(res, { data: newQuiz});
    }catch(e){
        sendError(res, req, e.message)
    }
}

const deleteQuiz = (req, res, next) => {
    Quiz.findByIdAndRemove(req.params.quizId).then(responseData => {
        sendData(res, responseData.data)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

const updateQuiz = (req, res, next) => {
    Quiz.findByIdAndUpdate(req.params.quizId, {$set: req.body }, { new: true }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

const getQuizzes = (req, res, next) => {
    Quiz.find({isEnabled: true}).then(responseData => { 
        sendData(res, responseData) 
    }).catch(err => {
        sendError(res, req, err.message)
    })
}


/**
 * Sends data to the client
 * @param  {} res - response 
 * @param  {Object} data - { data: <DATA> }
 */
const sendData = (res, data) => {
    res.status(200).json({ 
        error: null,
        data: data
    })
}

/**
 * Sends an error to the client
 * TODO: next? error handling
 * @param  {} res - response 
 * @param  {} req - request
 * @param  {String} error - Error message
 */
const sendError = (res, req, error) => {
    logger(`${chalk.cyan(req.ip)} throwed error ${chalk.bgRed(error)}`, 'Quiz Controller', 3)
    res.status(400)
    .json({
        error: error
    })
}

module.exports = {
    // showQuizOverview,
    // showQuiz,
    //Admin
    createQuiz,
    deleteQuiz,
    updateQuiz,
    getQuestions,
    createQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    getQuizzes,
    getQuiz
  };