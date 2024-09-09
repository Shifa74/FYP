const express = require("express");
const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");
const router = express();

//  CREATE
router.post("/add", addEmployee);

// READ
router.get("/get", getEmployees);

// UPDATE
router.put("/edit/:id", updateEmployee);

// DELETE
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
