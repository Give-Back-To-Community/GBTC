const express = require("express");
const router = express.Router();
const fetchRecentBlogsController = require("../controllers/fetchRecentBlogsController");

const fetchSingleBlogController = require("../controllers/fetchSingleBlogController");
router.get("/recentBlogs", fetchRecentBlogsController);
router.post("/singleBlog", fetchSingleBlogController);
module.exports = router;
