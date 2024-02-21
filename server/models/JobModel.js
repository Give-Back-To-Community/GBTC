const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: String,
    requirements: [String],
    applicants: [
      {
        name: String,
        email: String,
        graduationYear: Number,
        college: String,
        stream: String,
        resume: {
          data: Buffer,
          contentType: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
