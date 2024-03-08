const Blog = require("../models/BlogModel");
const BlogRecord = require("../models/BlogRecordModel");

const fetchRecentBlogs = async (req, res) => {
  try {
    // Query the database to fetch the latest blogs
    const blogDetails = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by creation timestamp in descending order
      .limit(4); // Limit the number of blogs to 4

    // Array to store promises for BlogRecord.findOne() calls
    const promises = blogDetails.map((blog) => {
      return BlogRecord.findOne({ _id: blog.blogRecordId })
        .populate("user")
        .then((populatedQuery) => {
          return {
            title: blog.title,
            description: blog.description,
            url: blog.url,
            user: populatedQuery.user,
          };
        });
    });

    // Wait for all promises to resolve
    const recentBlogs = await Promise.all(promises);

    res.status(200).json({ recentBlogs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = fetchRecentBlogs;
