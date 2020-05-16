const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtKey = 'very_hard_secret_key';
const jwtExpirySeconds = 86400;


const UserModel = require('../models/User');
const { handleError } = require('./general_helpers');


const signIn = async (req, res) => {
  // Get credentials from JSON body
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      // return 401 error is username or password doesn't exist, or if password does
      // not match the password in our records
      return handleError(res, "missing email or password");
    } else if (email && password) {
      user = await UserModel.findOne({ email: email });
      console.log(password);
      console.log(user.password);
      const isEqual = await bcrypt.compare(password, user.password);
      console.log(isEqual);
      if (isEqual) {
        // Create a new token with the email in the payload
        // and which expires 300 seconds after issue
        const id = user._id;
        const token = jwt.sign({ id }, jwtKey, {
          algorithm: 'HS256',
          expiresIn: jwtExpirySeconds
        })
        console.log('token:', token);

        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds, so we multiply by 1000
        res.cookie('user_token', token, { maxAge: jwtExpirySeconds * 1000 });
        return res.json({ status: 1, message: "sign in success" });;
      } else return handleError(res, "invalid email or password");
    }
  } catch (err) {
    console.log(err);
    return handleError(res);
  }
}

const refresh = (req, res) => {
  // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).end();
  }

  var payload
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return res.status(400).end()
  }
  // (END) The code uptil this point is the same as the first part of the `welcome` route

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end()
  }

  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })

  // Set the new token as the users `token` cookie
  res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 });
  res.end();
}


module.exports = {
  signIn,
  refresh
}