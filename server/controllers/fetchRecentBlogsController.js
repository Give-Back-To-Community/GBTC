const Blog = require("../models/BlogModel");

const fetchRecentBlogs = async (req, res) => {
  try {
    // Query the database to fetch the latest blogs
    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by creation timestamp in descending order
      .limit(4); // Limit the number of blogs to 3, adjust as per your requirement

    res.status(200).json({ recentBlogs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = fetchRecentBlogs;
