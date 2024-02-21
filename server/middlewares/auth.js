const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized User No token found",
    });
  } else {
    const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET);

    if (!isTokenVerified) {
      res.status(401).json({
        message:
          "Token is not verified , Some unauthorized user trying to access the system",
      });
    } else {
      req.userId = isTokenVerified.userId;
      next();
    }
  }
};
module.exports = auth;
