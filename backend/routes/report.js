const express = require("express");
const {
  generateReport,
  getReportList,
  getReportDetails,
  deleteReport,
} = require("../controllers/report");
const router = express.Router();

router.post("/add", generateReport);
router.get("/get", getReportList);
router.get("/get/details", getReportDetails);

router.delete("/delete/:id", deleteReport);


module.exports = router;
