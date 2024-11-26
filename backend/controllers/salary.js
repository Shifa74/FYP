import createError from "../middlewares/error.js";
import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";
import { calculateSalary } from "../utils/calculateSalary.js";

export const generateSalary = async (req, res, next) => {
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
      overtimeHours,
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

export const getSalaries = async (req, res, next) => {
  try {
    const salaries = await Salary.find()
      .populate({
        path: "employeeID",
        populate: [
          { path: "gradeNo", model: "Grade" },
          { path: "deptName", model: "Department" },
        ],
      })
      .populate("allowances")
      .populate("deductions");
      salaries.sort((a, b) => a.employeeID.employeeId - b.employeeID.employeeId);
    res.status(200).json(salaries);
  } catch (error) {
    next(error);
  }
};

export const confirmPayment = async (req, res, next) => {
  try {
    const updatedSalary = await Salary.findByIdAndUpdate(
      req.params.id,
      { status: "Paid", paidAt: new Date() },
      { new: true }
    );
    res.status(200).json(updatedSalary);
  } catch (error) {
    next(error);
  }
};

export const payrollSummary = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return next(createError(400, "Month and year are required"));
    }

    // Convert month and year to numbers to match MongoDB field types
    const monthNumber = parseInt(month);
    const yearNumber = parseInt(year);

    const payrollCosts = await Salary.aggregate([
      {
        $match: {
          month: monthNumber,
          year: yearNumber,
        },
      },
      { $group: { _id: null, total: { $sum: "$netSalary" } } },
    ]);

    const pendingPayments = await Salary.aggregate([
      {
        $match: {
          status: "Pending",
          month: monthNumber,
          year: yearNumber,
        },
      },
      { $group: { _id: null, total: { $sum: "$netSalary" } } },
    ]);

    const totalPayrolls = await Salary.countDocuments({
      month: monthNumber,
      year: yearNumber,
    });

    res.json({
      payrollCosts: payrollCosts[0]?.total || 0,
      pendingPayments: pendingPayments[0]?.total || 0,
      totalPayrolls,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSalary = async(req, res, next) => {
  try {
    const employeeId = req.params.id;
    await Salary.findByIdAndDelete(employeeId);
    res.status(200).json("Salary record has been deleted.");
  } catch (error) {
    next(error);
  }
}

