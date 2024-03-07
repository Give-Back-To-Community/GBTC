const express = require("express");
const router = express.Router();
const fetchRecentBlogsController = require("../controllers/fetchRecentBlogsController");

router.get("/recentBlogs", fetchRecentBlogsController);
module.exports = router;
