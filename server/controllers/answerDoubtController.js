const Doubt = require("../models/DoubtsModel");

const answerDoubtController = async (req, res) => {
  const { content } = req.body;
  const doubt = await Doubt.findOne({ url: req.params.url });
  if (!doubt) return res.status(404).json({ message: "Doubt not found" });

  doubt.answers.push({ user: req.user.id, content });
  await doubt.save();
  Doubt.findOne({ url: req.params.url })
    .populate({
      path: "answers",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .then((populatedQuery) => {
      res.status(200).json(populatedQuery);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

module.exports = answerDoubtController;
