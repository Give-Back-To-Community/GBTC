const Blog = require("../models/BlogModel");

const addLikeController = async (req, res) => {
  try {
    // console.log("");
    const { url } = req.body;
    const userId = req.user._id;

    // Find the blog by its URL
    const curBlog = await Blog.findOne({ url });

    if (!curBlog) {
      return res.status(400).json({
        message: "No blog found with the provided URL",
        upvote: false,
      });
    }
    // console.log("currrrr", curBlog);
    // Check if the user has already liked the blog
    if (curBlog.likes.includes(userId)) {
      return res.status(200).json({
        message: "You have already liked this blog",
        upvote: true,
      });
    }

    // Add the user's ID to the likes array
    curBlog.likes.push(userId);

    // Save the updated blog document
    await curBlog.save();
    // console.log("currrrr", curBlog);

    return res.status(200).json({
      message: "Successfully liked the blog",
      upvote: false,
    });
  } catch (error) {
    console.error("Error adding like to blog:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = addLikeController;
