const mongoose = require("mongoose");

const BlogModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStackUsed: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    url: {
      type: String,
      required: true,
    },
    blogRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogRecord",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", BlogModel);
