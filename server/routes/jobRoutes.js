const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobControllers");
const auth = require("../middlewares/auth");

// Route for posting a job
router.post("/jobs", auth, jobController.postJob);

// Route for applying to a job
router.post("/jobs/:jobId/apply", auth, jobController.applyToJob);

// Route for viewing applied jobs
router.get("/jobs/applied", auth, jobController.viewAppliedJobs);

// Route for getting all job
router.get("/jobs", auth, jobController.getJobs);

// Route for getting a job by id
router.get("/jobs/:jobId", auth, jobController.getJobById);

module.exports = router;
