const mongoose = require("mongoose");

const BlogRecordModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("BlogRecord", BlogRecordModel);
