var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Hallo Welt!');
});

router.get('/ejs', function(req, res) {
  res.render('../views/main');
});

router.get('/sqit/game1', function(req, res) {
  res.render('sqit/games');
});

router.get('/sqit/game4', function(req, res) {
  res.render('./sqit/game4');
});

router.get('/sqit/game4hard', function(req, res) {
  res.render('./sqit/game4hard');
});
router.get('/sqit/game4/hard', function(req, res) {
  res.render('./sqit/game2hard');
});

module.exports = router;
