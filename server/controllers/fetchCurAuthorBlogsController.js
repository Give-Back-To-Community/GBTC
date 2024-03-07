const Blog = require("../models/BlogModel");
const BlogRecord = require("../models/BlogRecordModel");

const fetchCurAuthorBlogsController = async (req, res) => {
  const { url } = req.body;

  const blog = await Blog.findOne({ url });

  BlogRecord.findOne({ _id: blog.blogRecordId })
    .populate("blogs")
    .then((populatedQuery) => {
      res.status(200).json({ populatedQuery });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Some error occurred while fetching cur author all blogs",
        err,
      });
    });
};
module.exports = fetchCurAuthorBlogsController;
