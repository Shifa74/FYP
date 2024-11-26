import Employee from "../models/Employee.js";
import {
  currentMonthSalary,
  salaryPerMonth,
  gradeWiseCount,
  calculateAllowAndDeduct,
  getAllowAndDeductDetails,
} from "../utils/dashboard.js";

export const employeeCount = async (req, res, next) => {
  try {
    const totalEmployee = await Employee.countDocuments();
    res.status(200).json(totalEmployee);
  } catch (error) {
    next(error);
  }
};

export const getPaidSalary = async (req, res, next) => {
  try {
    const totalPaidSalary = await currentMonthSalary();
    res.status(200).json(totalPaidSalary);
  } catch (error) {
    next(error);
  }
};

export const getSalaryPerMonth = async (req, res, next) => {
  try {
    const totalSalary = await salaryPerMonth();
    res.status(200).json(totalSalary);
  } catch (error) {
    next(error);
  }
};

export const gradeWiseEmployees = async (req, res, next) => {
  try {
    const gradeWise = await gradeWiseCount();
    res.status(200).json(gradeWise);
  } catch (error) {
    next(error);
  }
};

export const allowAndDeductTotal = async (req, res, next) => {
  try {
    const totals = await calculateAllowAndDeduct();
    res.status(200).json(totals);
  } catch (error) {
    next(error);
  }
};

export const allowAndDeductDetails = async (req, res, next) => {
  try {
    const details = await getAllowAndDeductDetails();
    res.status(200).json(details);
  } catch (error) {
    next(error);
  }
};

