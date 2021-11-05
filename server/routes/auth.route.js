var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', function (req, res) {
    res.render('../views/auth/login.ejs');
})

router.get('/swiper', function (req, res) {
    res.render('../views/swiper.ejs');
})

router.post('/login', authController.loginUser);

router.post('/register', authController.registerUser);

module.exports = router;