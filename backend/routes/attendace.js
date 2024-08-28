const express = require("express");
const {addAttendance, getAttendance} = require("../controllers/attendance");
const router = express.Router();

router.post("/add", addAttendance);

router.get("/get", getAttendance);

module.exports = router;
