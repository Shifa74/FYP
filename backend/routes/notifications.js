const express = require("express");
const { employeeMissingInfo } = require("../controllers/notifications");
const router = express.Router();

router.get("/employee/missing-info", employeeMissingInfo);

module.exports = router;