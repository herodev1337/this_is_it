var router = require("express").Router();
const appController = require("../controllers/app.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", appController.showHome);

router.get("/whoami", authMiddleware, appController.showWhoami);

router.get("/karriere", function(req, res) {
  res.render('../views/karriere');
})

module.exports = router;