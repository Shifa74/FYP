import express from "express";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.js";
const router = express();

//  CREATE
router.post("/add", addEmployee);

// READ
router.get("/get", getEmployees);

// UPDATE
router.put("/edit/:id", updateEmployee);

// DELETE
router.delete("/delete/:id", deleteEmployee);

export default router;
