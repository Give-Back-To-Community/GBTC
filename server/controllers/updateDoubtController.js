// controllers/updateDoubtController.js

const Doubt = require("../models/DoubtsModel");

module.exports = async (req, res) => {
  try {
    const { content } = req.body;
    const updatedDoubt = await Doubt.findByIdAndUpdate(
      req.params.doubtId,
      { content },
      { new: true }
    );
    if (!updatedDoubt)
      return res.status(404).json({ message: "Doubt not found" });
    res.json(updatedDoubt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
