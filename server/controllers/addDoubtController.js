const Doubt = require("../models/DoubtsModel");

module.exports = async (req, res) => {
  try {
    const { content } = req.body;
    const newDoubt = new Doubt({ user: req.user.id, content });
    const savedDoubt = await newDoubt.save();
    res.json(savedDoubt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
