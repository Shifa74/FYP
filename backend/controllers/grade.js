const createError = require("../error");
const Grade = require("../models/Grade");

const addGrade = async (req, res, next) => {
  try {
    const grade = await Grade.findOne({ gradeNo: req.body.gradeNo });
    if (grade) {
      return next(createError(422, "Grade already exists."));
    }
    const newGrade = new Grade(req.body);
    const savedGrade = await newGrade.save();

    res.status(200).json(savedGrade);
  } catch (error) {
    next(error);
  }
};

const getGrades = async (req, res, next) => {
  try {
    const grades = await Grade.find();
    res.status(200).json(grades);
  } catch (error) {
    next(error);
  }
};

const updateGrade = async (req, res, next) => {
  try {
    const grade = await Grade.findOne({
      gradeNo: req.body.gradeNo,
      _id: { $ne: req.params.id },
    });

    if (grade) {
      return next(createError(422, "Grade already exists"));
    }

    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedGrade) {
      return next(createError(404, "Grade not found"));
    }

    res.status(200).json(updatedGrade);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteGrade = async(req, res, next) => {
  try {
    const gradeId = req.params.id;
    await Grade.findByIdAndDelete(gradeId);
    res.status(200).json("Grade has been deleted.");
  } catch (error) {
    next(error);
  }
}



module.exports = { addGrade, getGrades, updateGrade, deleteGrade };
