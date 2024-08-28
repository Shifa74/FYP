const express = require("express");
const {addRole, getRoles} = require("../controllers/role");

const router = express.Router();

router.post("/add", addRole);
router.get("/get", getRoles);

module.exports = router;
