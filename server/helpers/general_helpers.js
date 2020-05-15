const jwt = require('jsonwebtoken');
const jwtKey = 'strong_secret_key';


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

module.exports = {
  handleError,
  getUserId,
}