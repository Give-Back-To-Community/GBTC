const Doubt = require("../models/DoubtsModel");

module.exports = async (req, res) => {
  try {
    const doubts = await Doubt.find();
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
