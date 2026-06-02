const User = require("../models/User");
const Job = require("../models/Job");

exports.getRecommendations = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    const jobs = await Job.find();

    const recommendations = jobs.map(job => {

      const matchedSkills = job.requiredSkills.filter(skill =>
        user.skills.includes(skill)
      );

      const score =
        (matchedSkills.length / job.requiredSkills.length) * 100;

      return {
        job,
        matchScore: score
      };
    });

    recommendations.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    res.status(200).json(recommendations);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};