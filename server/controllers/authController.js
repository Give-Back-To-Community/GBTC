// controllers/authController.js
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const signup = async (req, res) => {
  // console.log("signup call");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    age,
    email,
    username,
    password,
    college,
    graduationYear,
    isStudent,
    currentIndustry,
    yearsOfExperience,
    organization,
    jobsapplied,
    socialmedia,
    profilePictureUrl,
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      age,
      email,
      username,
      password,
      college,
      graduationYear,
      isStudent,
      currentIndustry,
      yearsOfExperience,
      organization,
      jobsapplied,
      socialmedia,
      profilePictureUrl,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = generateToken(user._id);
    // console.log(token);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  // console.log("request coming");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  // console.log(email);
  try {
    let user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "password incorrect" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ token, name: user.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Invalid credentials" });
  }
};

module.exports = { signup, login };
