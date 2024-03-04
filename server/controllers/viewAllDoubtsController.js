const Doubt = require("../models/Doubt");

module.exports = async (req, res) => {
  try {
    const doubts = await Doubt.find();
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
