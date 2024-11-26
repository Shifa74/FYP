import Attendance from "../models/Attendance.js";
import Allowance from "../models/Allowance.js";
import Deduction from "../models/Deduction.js";
import Grade from "../models/Grade.js";
import Employee from "../models/Employee.js";
import getWorkingDays from "../utils/workingDays.js";
import createError from "../middlewares/error.js";

export const calculateSalary = async (
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

export default calculateSalary ;
