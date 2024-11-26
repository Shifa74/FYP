import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Grade from "../models/Grade.js";

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

export default employeeMissingInfo;
