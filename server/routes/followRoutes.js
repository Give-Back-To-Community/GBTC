const express = require("express");
const router = express.Router();

const followController = require("../controllers/followController");
const auth = require("../middlewares/auth");
router.post("/", auth, followController);

module.exports = router;
