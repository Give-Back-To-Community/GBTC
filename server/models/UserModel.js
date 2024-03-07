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
    profilePictureUrl: String,
    jobsApplied: [
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job", // This is where you specify the referenced model
        },
        appliedDate: { type: Date, default: Date.now },
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
