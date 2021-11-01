const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({error: "No token provided! Please login"});

  try {
    //TODO: token_secret from config file
    const verify = jwt.verify(token, "TOKEN_SECRET");
    req.user = verify;
    next();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
