import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import createError from "../middlewares/error.js";

// request reset password

export const requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return next(createError(400, "User with this email does not exist"));
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 300000; // OTP expires in 5 minutes
    await user.save();

    res.cookie("resetEmail", email, {
      httpOnly: true,
    });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}`,
      html: `<p>Your OTP for password reset is <strong>${otp}</strong></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // return res.status(500).json({ error: "Failed to send OTP" });
        return next(createError(500, "Failed to send OTP"));
      } else {
        return res.status(200).json({ message: "OTP sent to your email" });
      }
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    // return res.status(500).json({ error: "Server error" });
    return next(createError(500, "Server Error"));
  }
};

//  verify otp

export const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;
  const email = req.cookies.resetEmail;
  try {
    const user = await Admin.findOne({ email, resetOtp: otp });

    if (!user || user.resetOtpExpiry < Date.now()) {
      // return res.status(400).json({ error: "Invalid or expired OTP" });
      return next(createError(400, "Invalid or expired OTP"));
    }
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();
    
    res
      .status(200)
      .json({ message: "OTP verified. You can now reset your password." });
  } catch (error) {
    return next(createError(500, "Server Error"));
  }
};

// Reset Password

export const resetPassword = async (req, res, next) => {
  const { newPassword } = req.body;
  const email = req.cookies.resetEmail;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return next(createError(400, "User not found"));
    }
    // Hash the new password and update the user record
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.clearCookie("resetEmail");

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return next(createError(500, "Server Error"));
  }
};


