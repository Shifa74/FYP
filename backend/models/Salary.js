const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  allowances: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Allowance",
    required: true,
  },
  deductions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deduction",
    required: true,
  },
  totalDeductions: {
    type: Number,
    required: true,
  },
  baseSalary: {
    type: Number,
    required: true
  },   
  overtimePay : {
    type: Number,
    required: true,
  },
  netSalary: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// salarySchema.index({ employeeID: 1, month: 1, year: 1 }, { unique: true });

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
