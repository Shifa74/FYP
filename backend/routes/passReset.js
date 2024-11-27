import express from "express";
import {
  requestPasswordReset,
  verifyOtp,
  resetPassword,
} from "../controllers/passReset.js";

const router = express();

router.post("/request-pass-reset", requestPasswordReset);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword)

export default router;
