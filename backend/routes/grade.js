const express = require("express");
const {addGrade, getGrades, updateGrade, deleteGrade} = require("../controllers/grade");

const router = express.Router();

router.post("/add", addGrade);

router.get("/get", getGrades);

router.put('/edit/:id', updateGrade);

router.delete('/delete/:id', deleteGrade);

module.exports = router;
