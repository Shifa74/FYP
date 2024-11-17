const Department = require("../models/Department");
const Employee = require("../models/Employee");
const Grade = require("../models/Grade");

const employeeMissingInfo = async (req, res, next) => {
  try {
    const notifications = [];

    const employees = await Employee.find();

    // Loop through employees to check if their department and grade exist
    for (const employee of employees) {
      const departmentExists = await Department.exists({
        _id: employee.deptName,
      });
      const gradeExists = await Grade.exists({ _id: employee.gradeNo });

      // If either department or grade is missing, add a notification
      if (!departmentExists || !gradeExists) {
        const message = `Missing information for Employee ID: ${
          employee.employeeId
        }. ${!departmentExists ? "Department" : ""} ${
          !departmentExists && !gradeExists ? "and" : ""
        } ${!gradeExists ? "Grade " : ""}not found.`;
        notifications.push({
          type: "alert",
          message,
        });
      }
    }
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

module.exports = { employeeMissingInfo };
