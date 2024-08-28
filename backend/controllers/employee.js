const createError = require("../error");
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const Grade = require("../models/Grade");

// ADD AN EMPLOYEE
const addEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findOne({ employee_id: req.body.employee_id });
    if (emp) {
      return next(createError(422, "ID already exists"));
    }
    const empByEmail = await Employee.findOne({ email: req.body.email });
    if (empByEmail) {
      return next(createError(422, "Email already exists"));
    }
    const department = await Department.findOne({ name: req.body.deptName });
    if (!department) {
      return next(createError(422, "Department not found"));
    }

    const grade = await Grade.findOne({ gradeNo: req.body.gradeNo });
    if (!grade) {
      return next(createError(422, "Grade not found"));
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
const updateEmployeeFields = async (fieldsToUpdate) => {
  const updateData = {};

  if (fieldsToUpdate.gradeNo) {
    const newGrade = await Grade.findOne({ gradeNo: fieldsToUpdate.gradeNo });
    if (!newGrade) {
      throw new Error("Grade Not Found");
    }
    updateData.gradeNo = newGrade._id;
  }

  if (fieldsToUpdate.deptName) {
    const newDeptName = await Department.findOne({
      name: fieldsToUpdate.deptName,
    });
    if (!newDeptName) {
      throw new Error("Department Not Found");
    }
    updateData.deptName = newDeptName._id;
  }

  // Handle other fields that can be directly updated
  for (const key in fieldsToUpdate) {
    if (!["gradeNo", "deptName"].includes(key)) {
      updateData[key] = fieldsToUpdate[key];
    }
  }

  return updateData;
};

const updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const fieldsToUpdate = req.body;

    const updateData = await updateEmployeeFields(fieldsToUpdate);

    if (Object.keys(updateData).length === 0) {
      return next(createError(400, "No valid fields to update"));
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      { new: true }
    ).populate("gradeNo deptName");

    if (!updatedEmployee) {
      return next(createError(404, "Employee Not Found"));
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
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

module.exports = { addEmployee, getEmployees, updateEmployee, deleteEmployee };
