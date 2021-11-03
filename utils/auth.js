const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = auth_token => {
  if (!auth_token) return false;

  try {
    if (jwt.verify(auth_token, config.SECRET_TOKEN)) return true;
    return false;
  } catch {
    return false;
  }
};
