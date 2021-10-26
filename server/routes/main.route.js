var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('Hallo Welt!');
})

router.get('/ejs', function (req, res) {
    res.render('../views/main');
})

module.exports = router;