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
    jobsApplied: [
      {
        job: Number,
        // ref: "Job",
        appliedDate: { type: Date, default: Date.now },
      },
    ],
    socialmedia: [
      {
        platform: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
