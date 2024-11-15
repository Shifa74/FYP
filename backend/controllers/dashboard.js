const Employee = require("../models/Employee");
const {
  currentMonthSalary,
  salaryPerMonth,
  gradeWiseCount,
  calculateAllowAndDeduct,
  getAllowAndDeductDetails,
} = require("../utils/dashboard");

const employeeCount = async (req, res, next) => {
  try {
    const totalEmployee = await Employee.countDocuments();
    res.status(200).json(totalEmployee);
  } catch (error) {
    next(error);
  }
};

const getPaidSalary = async (req, res, next) => {
  try {
    const totalPaidSalary = await currentMonthSalary();
    res.status(200).json(totalPaidSalary);
  } catch (error) {
    next(error);
  }
};

const getSalaryPerMonth = async (req, res, next) => {
  try {
    const totalSalary = await salaryPerMonth();
    res.status(200).json(totalSalary);
  } catch (error) {
    next(error);
  }
};

const gradeWiseEmployees = async (req, res, next) => {
  try {
    const gradeWise = await gradeWiseCount();
    res.status(200).json(gradeWise);
  } catch (error) {
    next(error);
  }
};

const allowAndDeductTotal = async (req, res, next) => {
  try {
    const totals = await calculateAllowAndDeduct();
    res.status(200).json(totals);
  } catch (error) {
    next(error);
  }
};

const allowAndDeductDetails = async (req, res, next) => {
  try {
    const details = await getAllowAndDeductDetails();
    res.status(200).json(details);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  employeeCount,
  getPaidSalary,
  getSalaryPerMonth,
  gradeWiseEmployees,
  allowAndDeductTotal,
  allowAndDeductDetails,
};
