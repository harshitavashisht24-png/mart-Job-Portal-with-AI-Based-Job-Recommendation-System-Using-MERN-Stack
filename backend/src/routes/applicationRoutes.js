const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  applyJob,
  getMyApplications
} = require("../controllers/applicationController");

router.post("/apply", authMiddleware, applyJob);

router.get("/my-applications", authMiddleware, getMyApplications);

module.exports = router;