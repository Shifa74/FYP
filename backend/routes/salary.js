import express from "express";
import { generateSalary, getSalaries, confirmPayment, payrollSummary, deleteSalary } from "../controllers/salary.js";
const router = express.Router();

router.post("/add", generateSalary);

router.get("/get", getSalaries);

router.patch('/confirm-payment/:id', confirmPayment)

router.get('/summary',payrollSummary)

router.delete('/delete/:id',deleteSalary)

export default router;
