const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post(
  "/resume",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          resume: req.file.path
        },
        { new: true }
      );

      res.status(200).json({
        message: "Resume uploaded successfully",
        resume: user.resume
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;