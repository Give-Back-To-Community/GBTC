// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: String,
    username: String,
    password: String,
    college: String,
    graduationYear: Number,
    isStudent: Boolean,
    yearsOfExperience: Number,
    organization: String,
    role: String,
    jobsapplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    socialmedia: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
