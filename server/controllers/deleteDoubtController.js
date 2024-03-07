const Doubt = require("../models/DoubtsModel");

module.exports = async (req, res) => {
  try {
    const deletedDoubt = await Doubt.findByIdAndDelete(req.params.doubtId);
    if (!deletedDoubt)
      return res.status(404).json({ message: "Doubt not found" });
    res.json({ message: "Doubt deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
