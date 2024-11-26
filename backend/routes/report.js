import express from "express";
import {
  generateReport,
  getReportList,
  getReportDetails,
  deleteReport,
} from "../controllers/report.js";
const router = express.Router();

router.post("/add", generateReport);
router.get("/get", getReportList);
router.get("/get/details", getReportDetails);

router.delete("/delete/:id", deleteReport);


export default router;
