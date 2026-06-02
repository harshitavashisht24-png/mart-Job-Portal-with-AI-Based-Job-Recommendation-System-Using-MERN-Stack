const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { skills, education, experience, resume } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        skills,
        education,
        experience,
        resume
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile Updated Successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};