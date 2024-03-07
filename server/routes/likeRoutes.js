const express = require("express");
const router = express.Router();

const addLikeController = require("../controllers/addLikeController");
const auth = require("../middlewares/auth");
router.post("/addLike", auth, addLikeController);

module.exports = router;
