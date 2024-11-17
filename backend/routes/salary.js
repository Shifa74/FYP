const express = require("express");
const { generateSalary, getSalaries, confirmPayment, payrollSummary, deleteSalary } = require("../controllers/salary");
const router = express.Router();

router.post("/add", generateSalary);

router.get("/get", getSalaries);

router.patch('/confirm-payment/:id', confirmPayment)

router.get('/summary',payrollSummary)

router.delete('/delete/:id',deleteSalary)

module.exports = router;
