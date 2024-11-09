const createError = require("../error");
const Employee = require("../models/Employee");
const Salary = require("../models/Salary");
const { calculateSalary } = require("../utils/calculateSalary");

const generateSalary = async (req, res, next) => {
  try {
    const { employeeId, month, year, allowance, deduction, overtimeHours } =
      req.body;

    const employee = await Employee.findOne({ employeeId });
    if (!employee) throw createError(404, "Employee not found.");

    const existingSalary = await Salary.findOne({
      employeeID: employee._id,
      month,
      year,
    });

    if (existingSalary) {
      throw createError(
        400,
        "Salary record already exists for this month and year."
      );
    }

    const salaryDetails = await calculateSalary(
      employee._id,
      month,
      year,
      allowance,
      deduction,
      overtimeHours
    );

    const newSalary = new Salary({
      employeeID: employee._id,
      month,
      year,
      baseSalary: salaryDetails.baseSalary,
      overtimePay: salaryDetails.overtimePay,
      allowances: salaryDetails.totalAllowance,
      deductions: salaryDetails.deductionReference,
      totalDeductions: salaryDetails.totalDeduction,
      netSalary: salaryDetails.netSalary,
      status: "Pending",
    });

    const savedSalary = await newSalary.save();
    res.status(200).json(savedSalary);
  } catch (error) {
    next(error);
  }
};

const getSalaries = async (req, res, next) => {
  try {
    const salaries = await Salary.find()
      .populate("employeeID")
      .populate("allowances")
      .populate("deductions");
    res.status(200).json(salaries);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateSalary,
  getSalaries,
};
