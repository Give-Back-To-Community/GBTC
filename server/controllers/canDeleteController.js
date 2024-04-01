const Doubt = require("../models/DoubtsModel");

const canDeleteController = async (req, res) => {
  const { id } = req.body;
  console.log("id" + id);
  const userID = req.user._id;

  try {
    let doubtUserId = "";
    Doubt.findById(id)
      .populate("user")
      .then((respo) => {
        console.log(respo);
        //   doubtUserId = respo.user._id;
      });

    if (userID === doubtUserId) {
      return res
        .status(200)
        .json({ message: "Success can delete this doubt, authorized user" });
    } else {
      return res
        .status(403)
        .json({ message: "User is not authorized to delete this doubt" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Some server error occurred: ${err}` });
  }
};

module.exports = canDeleteController;
