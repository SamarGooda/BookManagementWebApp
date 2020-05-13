const jwt = require('jsonwebtoken');


const handleError = (res, msg = "something went wrong", n = 0) => {
  return res.status(401).json({ status: 0, message: msg, code: n });
}

function getUserId(token) {
  console.info("getUserId ======================>");
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtKey);
      console.info("decoded", decoded);
      return decoded.payload;
    } catch (e) {
      console.error(e);
    }
  }

  return undefined;
}

module.exports = {
  handleError,
  getUserId, 
}