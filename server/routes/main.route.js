var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('Hallo Welt!');
})

router.get('/ejs', function (req, res) {
    res.render('../views/main');
})

router.get('/navbar', function (req, res) {
    res.render('../views/navbar_test');
})

router.get('/swiper', function (req, res) {
    res.render('../views/swiper');
})

router.get('/whoami', (req, res) => {
    let request = Object.entries(req.rawHeaders);

    res.render('../views/whoami', { 
        who: request
    })
});

module.exports = router;