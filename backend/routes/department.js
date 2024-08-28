const express = require("express");
const {addDept, getDept, updateDept} = require("../controllers/department");

const router = express.Router();

router.post('/add', addDept);

router.get('/get', getDept);

router.put('/edit/:id', updateDept);


module.exports = router;