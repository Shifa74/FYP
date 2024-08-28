const express = require("express");
const {addGrade, getGrades} = require("../controllers/grade");

const router = express.Router();

router.post("/add", addGrade);

router.get("/get", getGrades);

module.exports = router;
