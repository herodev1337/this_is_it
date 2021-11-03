const auth = require('../utils/auth')

module.exports = (req, res, next) => {
  if(auth(req.cookies.auth_token)){
    next();
  } else {
    res.status(401).json({ error: "Error with token authentication!" });
  }
};
