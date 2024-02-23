// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { signup, login } = require("../controllers/authController");
const signupValidationMiddleware = require("../middlewares/signupValidationMiddleware");
const loginValidationMiddleware = require("../middlewares/loginValidationMiddleware");

// Signup route
router.post(
  "/signup",
  signupValidationMiddleware,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  signup
);

// Login route
router.post(
  "/login",
  loginValidationMiddleware,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

router.get("/", (req, res) => {
  res.send("success");
});

module.exports = router;
