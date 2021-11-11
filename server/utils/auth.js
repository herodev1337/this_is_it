const jwt = require("jsonwebtoken");
const config = require("config")
module.exports = (auth_token) => {
  if (!auth_token) return false;

  try {
    //TODO: token_secret from config file
    if(jwt.verify(auth_token, config.auth.token_secret)) return true;
    return false;
  } catch {
    return false;
  }
};
