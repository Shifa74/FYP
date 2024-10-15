const express = require("express");
const {
  addAttendance,
  getAttendance,
  editAttendance,
  deleteAttendance,
  workingDays,
} = require("../controllers/attendance");
const router = express.Router();

router.post("/add", addAttendance);

router.get("/get", getAttendance);

router.put("/edit/:id", editAttendance);

router.delete("/delete/:id", deleteAttendance);

router.get("/getWorkingDays", workingDays);

module.exports = router;
