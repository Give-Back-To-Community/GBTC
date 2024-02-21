const Job = require("../models/JobModel");
const User = require("../models/UserModel");

exports.postJob = async (req, res) => {
  try {
    console.log(req.body);
    // Check if req.user exists and has isStudent property
    if (req.user && !req.user.isStudent) {
      const job = new Job({
        company: req.body.company,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        requirements: req.body.requirements,
      });
      await job.save();
      res.status(201).json({ message: "Job posted successfully", job });
    } else {
      res.status(403).json({ message: "Only graduates can post jobs" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.applyToJob = async (req, res) => {
  console.log(req.body);
  try {
    const { jobId } = req.params;
    const { name, email, graduationYear, college, stream, resume } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findById(req.user._id);
    console.log(user);
    user.jobsApplied.push(jobId);
    await user.save();

    res.status(200).json({ message: "Applied to job successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.viewAppliedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("jobsApplied");
    res.status(200).json(user.jobsApplied);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
