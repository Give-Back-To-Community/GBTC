const Doubt = require("../models/DoubtsModel");

const viewAllDoubtsController = async (req, res) => {
  // console.log("in view all doubt container");
  try {
    Doubt.find()
      .populate("user")
      .populate({
        path: "answers",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .then((populatedQuery) => {
        res.status(200).json({ populatedQuery });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = viewAllDoubtsController;
