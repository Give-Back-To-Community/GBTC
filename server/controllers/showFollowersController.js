const User = require("../models/UserModel");
const showFollowersController = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: "Successfully fetched all your followers",
    followers: user.followers,
  });
};
module.exports = showFollowersController;
