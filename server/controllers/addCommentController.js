const Blog = require("../models/BlogModel");
const User = require("../models/UserModel");
const Comment = require("../models/CommentModel");
const addCommentController = async (req, res) => {
  // console.log("request coming");
  const { url, content } = req.body;
  const userId = req.user._id;

  if (!url) {
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
      url,
    });
    if (!curBlog) {
      res.status(400).json({
        message: "No such blog exist",
      });
    }
    // console.log(curBlog);

    await Blog.findOneAndUpdate(
      { url },
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );

    const c = await Blog.findOne({
      url,
    });
    res.status(200).json({
      message: "successfully added comment",
      newComment: {
        content: newComment.content,
        name: curUser.name,
        college: curUser.college,
      },
    });
  }
};
module.exports = addCommentController;
