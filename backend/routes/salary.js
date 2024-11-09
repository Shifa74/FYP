const express = require("express");
const { generateSalary, getSalaries } = require("../controllers/salary");
const router = express.Router();

router.post("/add", generateSalary);

router.get("/get", getSalaries);

module.exports = router;
