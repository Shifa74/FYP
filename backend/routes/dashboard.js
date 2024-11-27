import express from "express";
import {
  employeeCount,
  getPaidSalary,
  getSalaryPerMonth,
  gradeWiseEmployees,
  allowAndDeductTotal,
  allowAndDeductDetails,
} from "../controllers/dashboard.js";

const router = express.Router();

router.get("/total-employees", employeeCount);

router.get("/salary/per-month", getSalaryPerMonth);

router.get("/paid-salary", getPaidSalary);

router.get("/allow/deduct", allowAndDeductTotal);

router.get("/allow/deduct/details", allowAndDeductDetails);

router.get("/grade-wise/employees", gradeWiseEmployees);

export default router;
