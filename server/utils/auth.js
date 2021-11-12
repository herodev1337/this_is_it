const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const Group = require("../models/Group");

/**
 * @param  {String} auth_token - Authentication token from cookie
 * @returns {Object}
 * @returns {Boolean}
 */
const verifyToken = (auth_token) => {
  //Kein Auth-Token?
  if (!auth_token) return false;
  try {
    //Verify den Auth-Token
    if(jwt.verify(auth_token, config.auth.token_secret)) return true;
    return false;
  } catch {
    return false;
  }
}

/**
 * @param  {String} auth_token - Authentication token from cookie
 * @returns {Object}
 * @returns {Boolean}
 */
const decodeToken = (auth_token) => {
  if (!auth_token) return false;
  try {
    let verifiedToken = jwt.verify(auth_token, config.auth.token_secret)
    return verifiedToken ? verifiedToken : false;  
  } catch {
    return false;
  }
}

/**
 * @async
 * TODO: Cleanup
 * @param  {String} auth_token
 * @param  {String} path
 * @returns {Boolean}
 */
const checkAccessPermission = async (auth_token, path) => {

  const tokenData = decodeToken(auth_token);
  if(!tokenData && !tokenData.username) return false;

  let userData = await User.findOne({ username: tokenData.username});

  for(const group of userData.groups){
    let groupData = await Group.findOne({identifier: group});
    if(!groupData && !groupData.routes) return false;
    for(const route of groupData.routes){
      let regex = new RegExp(route).test(path);
      if(regex){
        return true;
      }
    }
  }
  return false;
}

module.exports = {
  verifyToken,
  decodeToken,
  checkAccessPermission
}