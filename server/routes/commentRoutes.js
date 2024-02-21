const express = require("express");
const router = express.Router();

const viewCommentController = require("../controllers/viewCommentController");
const addCommentController = require("../controllers/addCommentController");
const auth = require("../middlewares/auth");
router.get("/viewComment", auth, viewCommentController);
router.post("/addComment", auth, addCommentController);
module.exports = router;
