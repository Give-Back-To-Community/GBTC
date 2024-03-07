const { json } = require("express");
const Blog = require("../models/BlogModel");

const fetchSingleBlogController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(404).json({ message: "No url found" });
    return;
  }

  Blog.findOne({ url })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .then((populatedQuery) => {
      res.status(200).json({ populatedQuery });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Some error occurred while fetching Feed" });
    });
};
module.exports = fetchSingleBlogController;
