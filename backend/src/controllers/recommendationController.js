const User = require("../models/User");
const Job = require("../models/Job");

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const jobs = await Job.find();

    const recommendations = jobs.map((job) => {
      const matchingSkills = job.requiredSkills.filter((skill) =>
        user.skills.includes(skill)
      );

      const matchPercentage =
        job.requiredSkills.length === 0
          ? 0
          : Math.round(
              (matchingSkills.length /
                job.requiredSkills.length) *
                100
            );

      return {
        _id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        matchPercentage,
      };
    });

    recommendations.sort(
      (a, b) => b.matchPercentage - a.matchPercentage
    );

    res.status(200).json(recommendations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};