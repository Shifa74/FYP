const createError = require("../error");
const Department = require("../models/Department");

const addDept = async (req, res, next) => {
  try {
    const dept = await Department.findOne({ name: req.body.name });
    if (dept) {
      return next(createError(422, "Department already exists."));
    }
    const newDept = new Department(req.body);
    const savedDept = await newDept.save();

    res.status(200).json(savedDept);
  } catch (error) {
    next(error);
  }
};

const getDept = async (req, res, next) => {
  try {
    const depts = await Department.find();
    res.status(200).json(depts);
  } catch (error) {
    next(error);
  }
};

const getEmpCountByDept = async (req, res, next) => {
  try {
    const employeeCounts = await Department.aggregate([
      {
        $lookup: {
          from: "employees", // The name of the Employee collection
          localField: "_id", // Match department _id with employee's deptName
          foreignField: "deptName", // Match on deptName in Employee
          as: "employees", // Result of the lookup will be stored in this field
        },
      },
      {
        $project: {
          departmentName: "$name", // Include department name
          employeeCount: { $size: "$employees" }, // Count of employees in the department
        },
      },
    ]);

    res.status(200).json(employeeCounts); // Send the department employee count data as JSON
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};


const updateDept = async (req, res, next) => {
  const dept = await Department.findOne({ name: req.body.name });
  if (!dept) {
    try {
      const updatedDept = await Department.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedDept);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(422, "Department already exists"));
  }
};

const deleteDept = async (req, res, next) => {
  try {
    const deptId = req.params.id;
    await Department.findByIdAndDelete(deptId);
    res.status(200).json("Department has been deleted.");
  } catch (error) {
    next(error);
  }
};

  module.exports = { addDept, getDept, updateDept, deleteDept,   getEmpCountByDept,};
