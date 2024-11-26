import createError from "../middlewares/error.js";
import Allowance from '../models/Allowance.js'

// ADD ALLOWANCE
export const addAllowance = async (req, res, next) => {
  try {
    const allowance = await Allowance.findOne({
      allowanceType: req.body.allowanceType
    });
    if (allowance) {
      return next(createError(422, "Allowance with this type already exists."));
    }
    const newAllowance = new Allowance(req.body);
    const savedAllowance = await newAllowance.save();
    res.status(200).json(savedAllowance);
  } catch (error) {
    next(error);
  }
};

// GET ALLOWANCES
export const getAllowances = async (req, res, next) => {
  try {
    const allowances = await Allowance.find();
    res.status(200).json(allowances);
  } catch (error) {
    next(error);
  }
};

// EDIT ALLOWANCE
export const editAllowance = async (req, res, next) => {
  try {
    const deduction = await Allowance.findOne({
      allowanceType: req.body.allowanceType,
      _id: { $ne: req.params.id },
    });
    if (deduction) {
      return next(createError(422, "Allowance with this type already exists."));
    }
    const updatedAllowance = await Allowance.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedAllowance) {
      return next(createError(404, "Allowance not found."));
    }
    res.status(200).json(updatedAllowance);
  } catch (error) {
    next(error);
  }
};

// DELTE ALLOWANCE
export const deleteAllowance = async (req, res, next) => {
  try {
    const allowanceId = req.params.id;
    await Allowance.findByIdAndDelete(allowanceId);
    res.status(200).json("Allowance has been deleted.");
  } catch (error) {
    next(error);
  }
};

