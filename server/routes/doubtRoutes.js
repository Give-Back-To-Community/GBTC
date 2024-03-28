const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const postDoubtController = require("../controllers/addDoubtController");
const answerDoubtController = require("../controllers/answerDoubtController");
const viewAllDoubtsController = require("../controllers/viewAllDoubtsController");
const viewMyDoubtsController = require("../controllers/viewMyDoubtsController");
const updateDoubtController = require("../controllers/updateDoubtController");
const deleteDoubtController = require("../controllers/deleteDoubtController");
const fetchSingleDoubtController = require("../controllers/fetchSingleDoubtController");

router.get("/view/all", viewAllDoubtsController);
router.get("/view/my", auth, viewMyDoubtsController);
router.get("/singleDoubt/:url", auth, fetchSingleDoubtController);
router.post("/add", auth, postDoubtController);
router.post("/:url/answer", auth, answerDoubtController);
router.put("/:doubtId", auth, updateDoubtController);
router.delete("/:doubtId", auth, deleteDoubtController);

module.exports = router;
