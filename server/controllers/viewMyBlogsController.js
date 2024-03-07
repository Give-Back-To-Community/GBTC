const BlogRecord = require("../models/BlogRecordModel");
const Blog = require("../models/BlogModel");

const viewMyBlogsController = (req, res) => {
  const userId = req.user._id;
  BlogRecord.findOne({
    user: userId,
  })
    .populate("blogs")
    .then((populatedQuery) => {
      res.status(200).json({
        blogs: populatedQuery,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Some error occurred while fetching my blogs",
        err,
      });
    });
};
module.exports = viewMyBlogsController;
