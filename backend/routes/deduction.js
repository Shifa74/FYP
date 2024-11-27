import express from "express";
import { addDeduction, getDeductions, editDeduction, deleteDeduction } from "../controllers/deduction.js";
const router = express.Router();

router.post("/add", addDeduction);

router.get("/get", getDeductions);

router.put("/edit/:id", editDeduction);

router.delete("/delete/:id", deleteDeduction);

export default router;
