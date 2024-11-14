const express = require("express");
const { generateSalary, getSalaries, confirmPayment, payrollSummary } = require("../controllers/salary");
const router = express.Router();

router.post("/add", generateSalary);

router.get("/get", getSalaries);

router.patch('/confirm-payment/:id', confirmPayment)

router.get('/summary',payrollSummary)

module.exports = router;
