const express = require("express");
const {
  addAllowance,
  getAllowances,
  editAllowance,
  deleteAllowance,
} = require("../controllers/allowance");

const router = express.Router();

router.post("/add", addAllowance);

router.get("/get", getAllowances);

router.put("/edit/:id", editAllowance);

router.delete("/delete/:id", deleteAllowance);

module.exports = router;
