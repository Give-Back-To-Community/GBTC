const BlogRecord = require("../models/BlogRecordModel");
const Blog = require("../models/BlogModel");

const viewAllBlogsController = (req, res) => {
  BlogRecord.find({})
    .populate("user")
    .populate({
      path: "blogs",
      populate: {
        path: "comments",
        model: "Comment",
      },
    })
    .then((populatedQuery) => {
      // console.log(populatedQuery);
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
module.exports = viewAllBlogsController;
