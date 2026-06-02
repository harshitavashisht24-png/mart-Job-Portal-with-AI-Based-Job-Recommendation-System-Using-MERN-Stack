const Application = require("../models/Application");

// Apply for Job
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const application = await Application.create({
      userId: req.user.id,
      jobId
    });

    res.status(201).json({
      message: "Job Applied Successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get My Applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user.id
    }).populate("jobId");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};