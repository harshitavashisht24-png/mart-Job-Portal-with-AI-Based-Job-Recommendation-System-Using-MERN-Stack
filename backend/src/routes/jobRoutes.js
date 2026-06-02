const express = require("express");
const router = express.Router();

// Controllers
const {
  createJob,
  getJobs,
  getJobById
} = require("../controllers/jobController");

// Middlewares
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Routes

// Create Job (ONLY ADMIN)
router.post("/", authMiddleware, adminMiddleware, createJob);

// Get all jobs (PUBLIC)
router.get("/", getJobs);

// Get single job (PUBLIC)
router.get("/:id", getJobById);

module.exports = router;