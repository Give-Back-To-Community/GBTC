const Blog = require("../models/BlogModel");
const User = require("../models/UserModel");
const Comment = require("../models/CommentModel");
const viewCommentController = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  const curBlog = await Blog.findOne({ _id: id });
  // console.log(curBlog);
  Blog.findOne({ _id: id })
    .populate("comments")
    .then((populatedQuery) => {
      res.status(200).json({ populatedQuery });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Some error occurred while fetching the comments",
        err,
      });
    });
};
module.exports = viewCommentController;
