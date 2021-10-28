var router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.showLogin);

router.post("/login", authController.loginUser);

router.post("/register", authController.registerUser);

module.exports = router;
