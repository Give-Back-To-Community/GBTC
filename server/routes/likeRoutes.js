const express = require("express");
const router = express.Router();

const addLikeController = require("../controllers/addLikeController");

router.post("/addLike", addLikeController);

module.exports = router;
