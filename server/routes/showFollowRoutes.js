const express = require("express");
const router = express.Router();

const showfollowersController = require("../controllers/showFollowersController");
const showfollowingController = require("../controllers/showFollowingController");

const auth = require("../middlewares/auth");
router.get("/followers", auth, showfollowersController);
router.get("/following", auth, showfollowingController);

module.exports = router;
