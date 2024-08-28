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



module.exports = { addGrade, getGrades };
