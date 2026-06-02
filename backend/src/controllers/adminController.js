const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications =
      await Application.countDocuments();

    res.status(200).json({
      totalUsers,
      totalJobs,
      totalApplications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};