const jwt = require('jsonwebtoken');
const jwtKey = 'very_hard_secret_key';


const handleError = (res, msg = "something went wrong", n = 0) => {
  return res.status(401).json({ status: 0, message: msg, code: n });
}

function getUserId(token) {
  console.info("====getUserId====");
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtKey);
      console.info("decoded id", decoded.id);
      return decoded.id;
    } catch (e) {
      console.error(e);
    }
  }
  console.error('user is not logged in');
  return undefined;
}

function isValidToken(token) {
  if (!token) {
    return false;
  } else {
    try {
      jwt.verify(token, jwtKey);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = {
  handleError,
  getUserId,
  isValidToken,
}