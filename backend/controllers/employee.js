const createError = require("../error");
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const Grade = require("../models/Grade");

// ADD AN EMPLOYEE
const addEmployee = async (req, res, next) => {
  try {
    const errors = [];
    const emp = await Employee.findOne({ employeeId: req.body.employeeId });
    if (emp) {
      errors.push(createError(422, "ID already exists", "employeeId"));
    }
    const empByEmail = await Employee.findOne({ email: req.body.email });
    if (empByEmail) {
      errors.push(createError(422, "Email already exists", "email"));
    }
    const department = await Department.findById(req.body.deptName);
    if (!department) {
      return next(createError(422, "Department not found"));
    }

    const grade = await Grade.findById(req.body.gradeNo);
    if (!grade) {
      return next(createError(422, "Grade not found"));
    }

    if (errors.length > 0) {
      const errorResponse = errors.reduce((acc, err) => {
        acc[err.field] = err.message;
        return acc;
      }, {});
      return res.status(422).json({ errors: errorResponse });
    }

    const newEmployee = new Employee({
      ...req.body,
      deptName: department._id,
      gradeNo: grade._id,
    });
    const savedEmployee = await newEmployee.save();

    res.status(200).json(savedEmployee);
  } catch (error) {
    next(error);
  }
};

// GET ALL EMPLOYEES
const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find()
      .populate("deptName")
      .populate("gradeNo");
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

// UPDATE EMPLOYEE

const updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const fieldsToUpdate = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      fieldsToUpdate,
      { new: true }
    ).populate("gradeNo deptName");

    if (!updatedEmployee) {
      return next(createError(404, "Employee Not Found"));
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log("Update Error:", error);
    next(error);
  }
};

// DELETE AN EMPLOYEE
const deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    await Employee.findByIdAndDelete(employeeId);
    res.status(200).json("Employee has been deleted");
  } catch (error) {
    next(error);
  }
};

// const getEmpCountByDept = async (req, res, next) => {
//   try {
//     const employeeCounts = await Employee.aggregate([
//       {
//         $group: {
//           _id: "$employee",
//           employeeCount: { $sum: 1 },
//         },
//       },
//       {
//         $lookup: {
//           from: "departments",
//           localField: "_id",
//           foreignField: "_id",
//           as: "department",
//         },
//       },
//       {
//         $unwind: "$department",
//       },
//       {
//         $project: {
//           _id: 0,
//           departmentName: "$department.name",
//           employeeCount: 1,
//         },
//       },
//     ]);
//     res.status(200).json(employeeCounts);
//   } catch (error) {
//     next(error);
//   }
// };



module.exports = {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
