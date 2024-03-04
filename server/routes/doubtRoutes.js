const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const postDoubtController = require("../controllers/addDoubtController");
const answerDoubtController = require("../controllers/answerDoubtController");
const viewAllDoubtsController = require("../controllers/viewAllDoubtsController");
const viewMyDoubtsController = require("../controllers/viewMyDoubtsController");
const updateDoubtController = require("../controllers/updateDoubtController");
const deleteDoubtController = require("../controllers/deleteDoubtController");

router.get("/doubts/all", auth, viewAllDoubtsController);
router.get("/doubts/my", auth, viewMyDoubtsController);
router.post("/doubts", auth, postDoubtController);
router.post("/doubts/:doubtId/answer", auth, answerDoubtController);
router.put("/doubts/:doubtId", auth, updateDoubtController);
router.delete("/doubts/:doubtId", auth, deleteDoubtController);

module.exports = router;
