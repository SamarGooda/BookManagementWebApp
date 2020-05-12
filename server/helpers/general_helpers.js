const handleError = (res, msg="something went wrong", n=0) => {
    return res.status(401).json({ status: 0, message: msg, code: n });
  }

module.exports = {
    handleError,
}