const Blog = require("../models/BlogModel");
const User = require("../models/UserModel");
const Comment = require("../models/CommentModel");
const addCommentController = async (req, res) => {
  const { id, content } = req.body;
  const userId = req.userId;

  if (!id) {
    res.status(400).json({
      message: "No such blog exist",
    });
  } else {
    const curUser = await User.findOne({ _id: userId });
    const newComment = await Comment.create({
      user: userId,
      content: content,
    });
    const curBlog = await Blog.findOne({
      _id: id,
    });
    if (!curBlog) {
      res.status(400).json({
        message: "No such blog exist",
      });
    }
    console.log(curBlog);

    await Blog.findOneAndUpdate(
      { _id: id },
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );

    const c = await Blog.findOne({
      _id: id,
    });
    res.status(200).json({
      message: "successfully added comment",
      newComment,
      c,
    });
  }
};
module.exports = addCommentController;
