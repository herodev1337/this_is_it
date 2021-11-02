const jwt = require("jsonwebtoken");

module.exports = (auth_token) => {
  if (!auth_token) return false;

  try {
    //TODO: token_secret from config file
    if(jwt.verify(auth_token, "TOKEN_SECRET")) return true;
    return false;
  } catch {
    return false;
  }
};
