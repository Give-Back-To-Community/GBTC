const { json } = require("express");
const Blog = require("../models/BlogModel");
const BlogRecord = require("../models/BlogRecordModel");

const fetchSingleBlogController = async (req, res) => {
  const { url } = req.body;
  const userId = req.user._id;
  if (!url) {
    res.status(404).json({ message: "No url found" });
    return;
  }
  const curBlog = await Blog.findOne({ url });
  const isLikedByCurrentUser = curBlog.likes && curBlog.likes.includes(userId);

  let blogRecord;

  Blog.findOne({ url })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .then((populatedQueryFirst) => {
      BlogRecord.findOne({ _id: curBlog.blogRecordId })
        .populate("user")
        .then((populatedQuery) => {
          // console.log("first", populatedQuery);
          blogRecord = populatedQuery.user;
          // console.log("second", blogRecord);
          res
            .status(200)
            .json({ populatedQueryFirst, blogRecord, isLikedByCurrentUser });
        })
        .catch((err) => {
          res.status(500).json({ message: "Error occurred", err });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Some error occurred while fetching Feed" });
    });
};
module.exports = fetchSingleBlogController;
