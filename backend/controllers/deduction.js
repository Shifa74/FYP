import createError from "../middlewares/error.js";
import Deduction from "../models/Deduction.js"; 

// ADD DEDUCTION
export const addDeduction = async (req, res, next) => {
  try {
    const deduction = await Deduction.findOne({
      deductionType: req.body.deductionType,
    });
    if (deduction) {
      return next(createError(422, "Deduction with this type already exists."));
    }
    const newDeduction = new Deduction(req.body);
    const savedDeduction = await newDeduction.save(newDeduction);

    res.status(200).json(savedDeduction);
  } catch (error) {
    next(error);
  }
};

// GET ADEDUCTION
export const getDeductions = async (req, res, next) => {
  try {
    const deductions = await Deduction.find();
    res.status(200).json(deductions);
  } catch (error) {
    next(error);
  }
};

// EDIT DEDUCTION
export const editDeduction = async (req, res, next) => {
  try {
    const deduction = await Deduction.findOne({
      deductionType: req.body.deductionType,
      _id: { $ne: req.params.id },
    });
    if (deduction) {
      return next(createError(422, "Deduction with this type already exists"));
    }
    const updatedDeduction = await Deduction.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedDeduction) {
      return next(createError(404, "Deduction not found."));
    }
    res.status(200).json(updatedDeduction);
  } catch (error) {
    next(error);
  }
};

// DELETE DEDUCTION
export const deleteDeduction = async (req, res, next) => {
  try {
    const deductionId = req.params.id;
    await Deduction.findByIdAndDelete(deductionId);
    res.status(200).json("Deduction has been deleted");
  } catch (error) {
    next(error);
  }
};

