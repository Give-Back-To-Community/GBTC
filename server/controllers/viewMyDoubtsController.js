const Doubt = require("../models/DoubtsModel");

const viewMyDoubtsController = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    res.status(401).json({ message: "No user id found , unauthorized user" });
  }

  Doubt.find({ user: userId })
    .populate("user")
    .populate({
      path: "answers",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .then((myDoubt) => {
      res.status(200).json({ myDoubt });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Some error occurred while fetching my doubt", err });
    });
};

module.exports = viewMyDoubtsController;
