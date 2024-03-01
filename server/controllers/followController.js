const User = require("../models/UserModel");

const followController = async (req, res) => {
  const { followingUserId } = req.body;
  const user = req.user;

  // added the senior as my follower
  if (user.followers) {
    await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $push: { followers: followingUserId },
      },
      {
        new: true,
      }
    );
  } else {
    await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        followers: [followingUserId],
      },
      {
        new: true,
      }
    );
  }

  const seniorUser = await User.findOne({ _id: followingUserId });
  if (!seniorUser) {
    res.status(400).json({
      message: "Bad request User which you want to follow does not exist",
    });
  } else {
    if (seniorUser.following) {
      await User.findOneAndUpdate(
        {
          _id: seniorUser.id,
        },
        {
          $push: { following: user._id },
        },
        {
          new: true,
        }
      );
    } else {
      await User.findOneAndUpdate(
        {
          _id: seniorUser.id,
        },
        {
          following: [user._id],
        },
        {
          new: true,
        }
      );
    }
  }

  res.status(200).json({
    message: "Successfully followed the user",
  });
};
module.exports = followController;
