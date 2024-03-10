const axios = require("axios");

exports.compileCode = async (req, res) => {
  console.log("Code:", req.body);
  let { code } = req.body;
  let { language } = req.body;
  if (!code) {
    return res.status(400).send("No code provided");
  }

  if (language === "javascript") {
    language = "nodejs";
  }
  try {
    const jdoodleResponse = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      {
        clientId: "be43935b65d0981dcd6b6d183a744e4c",
        clientSecret:
          "95d54a652b4fcae57218f54fbfa283df9168ce2fe0d4252ada214529339b2cc9",
        script: code,
        language: language,
        versionIndex: "0",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Send JDoodle's response back to the client
    res.json(jdoodleResponse.data);
  } catch (error) {
    console.error("Error calling JDoodle API:", error.message);
    res.status(500).send("Failed to compile code");
  }
};
