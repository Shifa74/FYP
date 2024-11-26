import express from "express";
import {
  addAttendance,
  getAttendance,
  editAttendance,
  deleteAttendance,
  workingDays,
} from "../controllers/attendance.js";
const router = express.Router();

router.post("/add", addAttendance);

router.get("/get", getAttendance);

router.put("/edit/:id", editAttendance);

router.delete("/delete/:id", deleteAttendance);

router.get("/getWorkingDays", workingDays);

export default router;
