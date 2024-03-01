const User = require("../models/UserModel");
const showFollowingController = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: "Successfully fetched all your followings",
    following: user.following,
  });
};
module.exports = showFollowingController;
