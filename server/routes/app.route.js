var router = require("express").Router();
const appController = require("../controllers/app.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", appController.showHome);

router.get("/whoami", authMiddleware, appController.showWhoami);

module.exports = router;
