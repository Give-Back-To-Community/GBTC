const { executeCode } = require("../services/jdoodleService");

exports.compileCode = async (req, res) => {
  try {
    const result = await executeCode(req.body.code);
    res.json(result);
  } catch (error) {
    console.error("Error in compileCode controller:", error.message);
    res.status(500).send("Failed to compile code");
  }
};
