const User = require("../models/User");

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { skills, education, experience } = req.body;

    const User = await User.findByIdAndUpdate(
      req.user.id,
      {
        skills,
        education,
        experience,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};