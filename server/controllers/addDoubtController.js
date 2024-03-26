const Doubt = require("../models/DoubtsModel");
const shortId = require("shortid");
const addDoubtController = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    res.status(401).json({ message: "No user id found , unauthorized user" });
  }
  const { title, content, doubtPictureUrl } = req.body;
  const url = shortId.generate();
  // console.log(title, content, doubtPictureUrl);
  const newDoubt = await Doubt.create({
    user: userId,
    title,
    content,
    doubtPictureUrl,
    url,
  });

  if (!newDoubt) {
    res
      .status(500)
      .json({ message: "Server error , Can;t add doubt try again later" });
  }
  res.status(200).json(newDoubt);
};

module.exports = addDoubtController;
