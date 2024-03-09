const axios = require("axios");

exports.compileCode = async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: "Missing language or code" });
  }

  try {
    const response = await axios.post("https://api.example.com/v1/execute", {
      language,
      code,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Compilation error:", error);
    res.status(500).json({ error: "Failed to compile code" });
  }
};
