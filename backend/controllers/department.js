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

module.exports = { addDept, getDept, updateDept };
