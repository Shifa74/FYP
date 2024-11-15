const express = require("express");
const {
  employeeCount,
  getPaidSalary,
  getSalaryPerMonth,
  gradeWiseEmployees,
  allowAndDeductTotal,
  allowAndDeductDetails,
} = require("../controllers/dashboard");

const router = express.Router();

router.get("/total-employees", employeeCount);

router.get("/salary/per-month", getSalaryPerMonth);

router.get("/paid-salary", getPaidSalary);

router.get("/allow/deduct", allowAndDeductTotal);

router.get("/allow/deduct/details", allowAndDeductDetails);

router.get("/grade-wise/employees", gradeWiseEmployees);

module.exports = router;
