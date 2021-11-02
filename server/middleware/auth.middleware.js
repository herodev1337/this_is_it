const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).send("Error with token!");

  try {
    //TODO: token_secret from config file
    const verify = jwt.verify(token, "TOKEN_SECRET");
    req.user = verify;
    next();
  } catch (e) {
    res.status(400).send("Invalid token!");
  }
};
