const Attendance = require("../models/Attendance");
const Allowance = require("../models/Allowance");
const Deduction = require("../models/Deduction");
const Grade = require("../models/Grade");
const Employee = require("../models/Employee");
const { getWorkingDays } = require("../utils/workingDays");
const createError = require("../error");

const calculateSalary = async (
  employeeId,
  month,
  year,
  allowanceType,
  deductionType,
  overtimeHours
) => {
  const employee = await Employee.findById(employeeId).populate(
    "gradeNo deptName"
  );
  if (!employee) throw createError(404, "Employee not found.");

  const grade = await Grade.findById(employee.gradeNo);
  if (!grade) throw createError(404, "Grade not found for the employee.");
  const baseSalary = grade.baseSalary;

  const allowanceDoc = await Allowance.findById(allowanceType);
  if (!allowanceDoc) throw createError(404, "Allowance type not found.");

  const deductionDoc = await Deduction.findById(deductionType);
  if (!deductionDoc) throw createError(404, "Deduction type not found.");

  const attendance = await Attendance.findOne({
    employeeId: employee._id,
    month,
    year,
  });
  if (!attendance)
    throw createError(404, "Attendance record not found for this month.");

  // calculate absence deduction
  const workingDays = getWorkingDays(month, year);
  const absentDays = attendance.absentDays;
  const dailySalary = baseSalary / workingDays;
  const absenceDeduction = (absentDays * dailySalary) / 2;
  const totalDeduction = absenceDeduction + deductionDoc.amount;

  // calculate overtime pay
  const presentDays = attendance.presentDays;
  const hourlyRate = baseSalary / (presentDays * 8);
  const overtimePay = overtimeHours * hourlyRate * 1.5; // overtimeRate = 1.5

  const finalSalary = baseSalary + allowanceDoc.amount - totalDeduction;

  // Calculate net salary
  const netSalary = finalSalary + overtimePay;

  return {
    baseSalary,
    totalAllowance: allowanceDoc._id,
    deductionReference: deductionDoc._id,
    totalDeduction,
    overtimePay,
    netSalary,
  };
};

module.exports = { calculateSalary };
