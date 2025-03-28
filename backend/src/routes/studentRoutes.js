const express = require("express");
const { getStudentDashboardData } = require("../controllers/studentController");

const router = express.Router();

// Fix: Add studentId as a route parameter
router.get("/dashboard/:studentId", getStudentDashboardData);

module.exports = router;
