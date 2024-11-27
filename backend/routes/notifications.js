import express from "express";
import employeeMissingInfo from "../controllers/notifications.js";
const router = express.Router();

router.get("/employee/missing-info", employeeMissingInfo);

export default router;