const express = require("express");
const {
  generateReport,
  getReportList,
  getReportDetails,
} = require("../controllers/report");
const router = express.Router();

router.post("/add", generateReport);
router.get("/get", getReportList);
router.get("/get/details", getReportDetails);

module.exports = router;
