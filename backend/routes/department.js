import express from "express";
import { addDept, getDept, updateDept, deleteDept, getEmpCountByDept } from "../controllers/department.js";

const router = express.Router();

router.post('/add', addDept);

router.get('/get', getDept);

router.get('/employeeCountByDept', getEmpCountByDept)

router.put('/edit/:id', updateDept);

router.delete('/delete/:id', deleteDept)


export default router;