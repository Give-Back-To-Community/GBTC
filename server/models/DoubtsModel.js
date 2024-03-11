const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    answers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    doubtPictureUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doubt", DoubtSchema);
