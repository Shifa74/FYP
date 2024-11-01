const express = require("express");
const {addDept, getDept, updateDept, deleteDept, getEmpCountByDept} = require("../controllers/department");

const router = express.Router();

router.post('/add', addDept);

router.get('/get', getDept);

router.get('/employeeCountByDept', getEmpCountByDept)

router.put('/edit/:id', updateDept);

router.delete('/delete/:id', deleteDept)


module.exports = router;