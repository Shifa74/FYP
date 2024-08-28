const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
  resetOtp: {
    type: String,
  },
  resetOtpExpiry: {
    type: Date
  }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
