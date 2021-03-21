const config = require("../config/keys");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check the token
  if (!token) {
    return res.status(401).json({ msg: "No token, autherization denied" }); // unauthorized
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
