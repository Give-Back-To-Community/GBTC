const Blog = require("../models/BlogModel");
const User = require("../models/UserModel");
const Comment = require("../models/CommentModel");
const viewCommentController = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  // .populate({
  //     path: "comments",
  //     populate: {
  //       path: "user",
  //       model: "User",
  //     },
  //   })
  // Blog.findOne({ _id: id })
  //   .populate("comments")
  //   .then((populatedComment) => {
  //     console.log(populatedComment);
  //     res.status(200).json({ populatedComment });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       message: "Some error occurred",
  //       err,
  //     });
  //   });
  const gg = await Blog.findOne({ _id: id });
  res.send(gg);
};
module.exports = viewCommentController;
