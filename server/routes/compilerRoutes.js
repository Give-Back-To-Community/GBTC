const express = require("express");
const router = express.Router();
const { compileCode } = require("../controllers/compileController");
const checkCode = require("../middlewares/checkCode");

router.post("/compile", compileCode);

module.exports = router;
