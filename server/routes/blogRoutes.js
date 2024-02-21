const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const addBlogController = require("../controllers/addBlogController");
const viewAllBlogsController = require("../controllers/viewAllBlogsController");
const viewMyBlogsController = require("../controllers/viewMyBlogsController");

router.get("/viewBlog/myBlogs", auth, viewMyBlogsController);
router.get("/viewBlog/allBlogs", auth, viewAllBlogsController);

router.post("/addBlog", auth, addBlogController);

module.exports = router;
