const showQuizOverview = (req, res) => {
    res.render('quiz/quizOverview');
}

const showQuiz = (req, res) => {
    res.render('quiz');
}

//Admin

const createQuiz = (req, res) => {
    res.render('home');
}

const deleteQuiz = (req, res) => {
    res.render('home');
}

const editQuiz = (req, res) => {
    res.render('home');
}

module.exports = {
    showHome,
    showWhoami
  };