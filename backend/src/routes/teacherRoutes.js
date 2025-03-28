const express = require("express");
const { getTeacherDashboardData } = require("../controllers/teacherController");

const router = express.Router();

router.get("/dashboard", getTeacherDashboardData);

module.exports = router;
