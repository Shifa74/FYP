const createError = require("../error");
const Salary = require("../models/Salary");

const generateMontlyReport = async (month, year) => {
  try {
    const record = await Salary.findOne({month, year});
    if (!record) {
      throw createError(404, "No record found for this month and year")
    }
    const report = await Salary.aggregate([
      {
        $match: {
          month,
          year,
        },
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
        $sort: {
          "employeeDetails.employeeId": 1,
        }
      },
      {
        $project: {
          _id: 0,
          "employeeDetails.employeeId": 1,
          "employeeDetails.firstName": 1,
          "employeeDetails.lastName": 1,
          baseSalary: 1,
          totalDeductions: 1,
          "allowanceDetails.amount": 1,
          netSalary: 1,
        },
      },
    ]);
    return report;
  } catch (error) {
    throw error;
  }
};

module.exports = generateMontlyReport;
