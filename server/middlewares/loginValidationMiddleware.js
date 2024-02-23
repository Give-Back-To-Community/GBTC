const { check } = require("express-validator");

const loginValidationMiddleware = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

module.exports = loginValidationMiddleware;
