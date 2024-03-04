const Doubt = require("../models/Doubt");

module.exports = async (req, res) => {
  try {
    const { content } = req.body;
    const doubt = await Doubt.findById(req.params.doubtId);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });

    doubt.answers.push({ user: req.user.id, content });
    await doubt.save();
    res.json(doubt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
