const Doubt = require("../models/DoubtsModel");

const fetchSingleDoubtController = async (req, res) => {
  const { url } = req.params;
  const userId = req.user._id;
  if (!url) {
    res.status(404).json({ message: "No url found" });
    return;
  }
  Doubt.findOne({ url })
    .populate({
      path: "answers",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .then((response) => {
      // console.log(response);
      res.status(200).json({ curDoubt: response });
    })
    .catch((err) => {
      // console.log("in catch statement");
      res.status(500).json({
        message: `Some error occurred while fetching the single doubt,  ${err}`,
        err,
      });
    });
};
module.exports = fetchSingleDoubtController;
