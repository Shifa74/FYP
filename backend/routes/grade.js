import express from "express";
import {addGrade, getGrades, updateGrade, deleteGrade} from "../controllers/grade.js";

const router = express.Router();

router.post("/add", addGrade);

router.get("/get", getGrades);

router.put('/edit/:id', updateGrade);

router.delete('/delete/:id', deleteGrade);

export default router;
