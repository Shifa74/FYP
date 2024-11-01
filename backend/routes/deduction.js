const express = require("express");
const { addDeduction, getDeductions, editDeduction, deleteDeduction } = require("../controllers/deduction");
const router = express.Router();

router.post("/add", addDeduction);

router.get("/get", getDeductions);

router.put("/edit/:id", editDeduction);

router.delete("/delete/:id", deleteDeduction);

module.exports = router;
