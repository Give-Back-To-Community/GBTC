// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signup, login } = require("../controllers/authController");

// Signup route
router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("age", "Age is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("college", "College is required").not().isEmpty(),
    check("graduationYear", "Graduation year is required").not().isEmpty(),
    check("isStudent", "Is student is required").not().isEmpty(),
  ],
  signup
);

// Login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

router.get("/", (req, res) => {
  res.send("sucess");
});

module.exports = router;
