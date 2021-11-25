const {verifyToken, checkAccessPermission} = require('../utils/auth')

module.exports = async (req, res, next) => {
    let token = await verifyToken(req.cookies.auth_token);
    let permission = await checkAccessPermission(req.cookies.auth_token, req.originalUrl);
    if(token){
      if(permission){
        next();
      } else {
        return res.status(401).json({ error: "Error with access permission!" })
      }
    } else {
      return res.status(401).json({ error: "Error with token authentication! Please login again" })
    }
};
