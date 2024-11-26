import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

export const currentMonthSalary = async () => {
  try {
    const totalPaidSalary = await Salary.aggregate([
      {
        $match: {
          month: currentMonth,
          year: currentYear,
          status: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalPaid: { $sum: "$netSalary" },
        },
      },
    ]);
    return totalPaidSalary[0]?.totalPaid || 0;
  } catch (error) {
    console.error("Error calculating paid salary", error.message);
    throw error;
  }
};

export const salaryPerMonth = async () => {
  try {
    const totalSalaryPerMonth = await Salary.aggregate([
      {
        $match: {
          month: currentMonth,
          year: currentYear,
        },
      },
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$netSalary" },
        },
      },
    ]);
    return totalSalaryPerMonth[0]?.totalSalary || 0;
  } catch (error) {
    console.error("Error calculating salary per month");
    throw error;
  }
};

export const gradeWiseCount = async () => {
  try {
    const gradeWiseCount = await Employee.aggregate([
      {
        $lookup: {
          from: "grades",
          localField: "gradeNo",
          foreignField: "_id",
          as: "gradeDetails",
        },
      },
      {
        $unwind: "$gradeDetails",
      },
      {
        $group: {
          _id: "$gradeDetails._id", // Group by the grade's _id to include it in the output
          gradeNo: { $first: "$gradeDetails.gradeNo" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          gradeNo: 1, 
        },
      },
      {
        $project: {
          _id: 1,
          gradeNo: 1,
          count: 1,
        },
      },
    ]);
    return gradeWiseCount;
  } catch (error) {
    console.error("Error counting employee", error.message);
    throw error;
  }
};

export const calculateAllowAndDeduct = async () => {
  try {
    const totals = await Salary.aggregate([
      {
        $match: {
          month: currentMonth,
          year: currentYear,
        },
      },
      {
        $lookup: {
          from: "allowances",
          localField: "allowances",
          foreignField: "_id",
          as: "allowanceDetails",
        },
      },
      {
        $unwind: "$allowanceDetails",
      },
      {
        $group: {
          _id: null,
          totalAllowances: { $sum: "$allowanceDetails.amount" },
          totalDeductions: { $sum: "$totalDeductions" },
        },
      },
    ]);
    return totals.length
      ? totals[0]
      : { totalAllowances: 0, totalDeductions: 0 };
  } catch (error) {
    console.error("Error calculating allowances and deductions", error.message);
    throw error;
  }
};

export const getAllowAndDeductDetails = async () => {
  try {
    const details = await Salary.aggregate([
      {
        $match: {
          month: currentMonth,
          year: currentYear,
        },
      },
      {
        $lookup: {
          from: "allowances",
          localField: "allowances",
          foreignField: "_id",
          as: "allowanceDetails",
        },
      },
      {
        $unwind: "$allowanceDetails",
      },
      {
        $lookup: {
          from: "employees",
          localField: "employeeID",
          foreignField: "_id",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails",
      },
      {
        $sort : {
          "employeeDetails.employeeId": 1
        }
      },
      {
        $project: {
          "employeeDetails.employeeId": 1,
          "employeeDetails.firstName": 1,
          "employeeDetails.lastName": 1,
          "allowanceDetails.amount": 1,
          totalDeductions: 1,
          createdAt: 1,
        },
      },
    ]);
    return details;
  } catch (error) {
    console.error("Error fetching allowances and deduction details");
    throw error;
  }
};

