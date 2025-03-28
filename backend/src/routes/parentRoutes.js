const express = require("express");
const { getParentDashboardData } = require("../controllers/parentController");

const router = express.Router();

router.get("/dashboard", getParentDashboardData);

module.exports = router;
