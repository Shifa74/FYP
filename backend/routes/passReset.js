const express = require("express");
const {
  requestPasswordReset,
  verifyOtp,
  resetPassword,
} = require("../controllers/passReset");

const router = express();

router.post("/request-pass-reset", requestPasswordReset);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword)

module.exports = router;
