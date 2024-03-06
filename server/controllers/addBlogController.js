const Blog = require("../models/BlogModel");
const BlogRecord = require("../models/BlogRecordModel");
const User = require("../models/UserModel");

const addBlog = async (req, res) => {
  const { title, description, techStackUsed } = req.body;
  const _id = req.user._id;
  // console.log(_id);
  const user = await User.findOne({ _id });

  if (!user) {
    res.status(500).json({
      message: "Can't add the Blog , Error occurred while fetching the user",
    });
  }
  const blog = await Blog.create({
    title,
    description,
    techStackUsed,
  });

  if (!blog) {
    res.status(500).json({
      message:
        "Can't add the Blog ,Some error occurred while adding blog to the database",
    });
  } else {
    let curRecord = await BlogRecord.findOne({
      user: _id,
    });

    if (curRecord) {
      curRecord = await BlogRecord.findOneAndUpdate(
        {
          user: _id,
        },
        {
          $push: { blogs: blog._id },
        },
        {
          new: true,
        }
      );
    } else {
      curRecord = await BlogRecord.create({
        user: _id,
        blogs: [blog._id],
      });
    }

    res.status(200).json({
      message: "successfully added blog and record bw user and blog",
      curRecord,
    });
  }
};

module.exports = addBlog;
